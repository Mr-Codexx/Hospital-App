import { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { db } from '../firebase';

// Helper function to encode IP for Firebase keys
const encodeIP = (ip) => {
  return ip.replace(/\./g, '_dot_');
};

// Helper function to decode IP from Firebase keys
const decodeIP = (encoded) => {
  return encoded.replace(/_dot_/g, '.');
};

const useVisitorCounter = () => {
  const [visitorData, setVisitorData] = useState({
    todayCount: 0,
    totalCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIPAndUpdateCount = async () => {
      try {
        // Get visitor's IP
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();
        const encodedIP = encodeIP(ip);
        
        const today = new Date().toISOString().split('T')[0];
        const visitorsRef = ref(db, 'visitors');

        // Listen for changes in Firebase
        onValue(visitorsRef, (snapshot) => {
          const data = snapshot.val() || {
            totalVisitors: {},
            dailyVisitors: {},
            lastUpdated: null
          };

          const isNewVisitor = !data.totalVisitors[encodedIP];
          const isTodayVisit = data.lastUpdated === today;

          let newTotalVisitors = { ...data.totalVisitors };
          let newDailyVisitors = { ...data.dailyVisitors };
          let newTodayCount = Object.keys(newDailyVisitors).length;

          if (isNewVisitor) {
            newTotalVisitors[encodedIP] = true;
          }

          if (!isTodayVisit) {
            newDailyVisitors = { [encodedIP]: true }; // Reset for new day
          } else if (isNewVisitor) {
            newDailyVisitors[encodedIP] = true;
          }

          // Update counts
          const newTotalCount = Object.keys(newTotalVisitors).length;
          newTodayCount = Object.keys(newDailyVisitors).length;

          // Update Firebase
          set(visitorsRef, {
            totalVisitors: newTotalVisitors,
            dailyVisitors: newDailyVisitors,
            lastUpdated: today
          });

          // Update local state
          setVisitorData({
            todayCount: newTodayCount,
            totalCount: newTotalCount
          });
          setLoading(false);
        });

      } catch (error) {
        console.error('Error tracking visitor:', error);
        setLoading(false);
      }
    };

    fetchIPAndUpdateCount();
  }, []);

  return { visitorData, loading };
};

export default useVisitorCounter;