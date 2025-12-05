import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
  Avatar,
  IconButton,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
  Textarea,
  Divider,
  Flex,
  Spinner,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  WrapItem,
  Tooltip,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Image,
  AspectRatio,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Tag,
  TagLabel,
  TagLeftIcon,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Kbd,
  Code,
  CloseButton,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Center,
  Square,
  Circle,
  WrapItem as ChakraWrapItem,
  TabIndicator,
  useClipboard,
  VisuallyHidden,
} from '@chakra-ui/react';
import {
  FiShoppingCart,
  FiPackage,
  FiSearch,
  FiFilter,
  FiStar,
  FiUser,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCheck,
  FiX,
  FiChevronRight,
  FiChevronLeft,
  FiDollarSign,
  FiBriefcase,
  FiHeart,
  FiShield,
  FiLock,
  FiLogIn,
  FiUserPlus,
  FiDownload,
  FiShare2,
  FiArrowLeft,
  FiHome,
  FiActivity,
  FiUsers,
  FiAward,
  FiFileText,
  FiGlobe,
  FiBookOpen,
  FiCamera,
  FiMic,
  FiMicOff,
  FiVideo,
  FiUpload,
  FiPaperclip,
  FiCopy,
  FiEdit,
  FiTrash2,
  FiEye,
  FiBell,
  FiSettings,
  FiHelpCircle,
  FiRotateCcw,
  FiPause,
  FiStopCircle,
  FiMaximize2,
  FiMinimize2,
  FiMoreVertical,
  FiHeadphones,
  FiWifi,
  FiBattery,
  FiVolume2,
  FiVolumeX,
  FiGrid,
  FiList,
  FiThumbsUp,
  FiTruck,
  FiCreditCard,
  FiShoppingBag,
  FiPercent,
  FiTag,
  FiArchive,
  FiBox,
  FiAlertCircle,
  FiRefreshCw,
  FiShoppingCart as FiCart,
  FiPlus,
  FiMinus,
  FiExternalLink,
  FiChevronDown,
  FiCheckCircle,
  FiBarChart2,
  FiTrendingUp,
  FiShoppingBag as FiBag,
  FiCornerUpRight,
  FiCornerUpLeft,
  FiRepeat,
  FiGitMerge,
  FiCodesandbox,
  FiHexagon,
  FiTool,
  FiAnchor,
  FiFeather,
  FiMonitor,
  FiCpu,
  FiHardDrive,
  FiServer,
  FiDatabase,
  FiCloud,
  FiCloudOff,
  FiWifiOff,
  FiBluetooth,
  FiZap,
  FiZapOff,
  FiSun,
  FiMoon,
  FiEyeOff,
  FiWatch,
  FiSmartphone,
  FiTablet,
  FiLaptop,
  FiPrinter,
  FiMousePointer,
  FiKeyboard,
  FiSpeaker,
  FiHeadset,
  FiMic as FiMicrophone,
  FiVideo as FiVideoIcon,
  FiRadio,
  FiTv,
  FiCamera as FiCameraIcon,
  FiMusic,
  FiPlay,
  FiPause as FiPauseIcon,
  FiSkipBack,
  FiSkipForward,
  FiRewind,
  FiFastForward,
  FiVolume1,
  FiVolume as FiVolumeIcon,
  FiVolumeX as FiVolumeXIcon,
  FiPlayCircle,
  FiStopCircle as FiStopCircleIcon,
  FiFilm,
  FiImage,
  FiFile,
  FiFolder,
  FiFolderPlus,
  FiFilePlus,
  FiTrash as FiTrashIcon,
  FiSave,
  FiDownloadCloud,
  FiUploadCloud,
  FiFolderMinus,
  FiFileMinus,
  FiEdit2,
  FiEdit3,
  FiType,
  FiBold,
  FiItalic,
  FiUnderline,
  FiStrikethrough,
  FiCode,
  FiLink,
  FiLink2,
  FiUnlink,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiAlignJustify,
  FiList as FiListIcon,
  FiGrid as FiGridIcon,
  FiLayout,
  FiSidebar,
  FiMenu,
  FiMoreHorizontal,
  FiMoreVertical as FiMoreVerticalIcon,
  FiSliders,
  FiToggleLeft,
  FiToggleRight,
  FiCheckSquare,
  FiSquare,
  FiCircle,
  FiTarget,
  FiAperture,
  FiCommand,
  FiNavigation,
  FiNavigation2,
  FiCompass,
  FiMap,
  FiGlobe as FiGlobeIcon,
  FiFlag,
  FiBookmark,
  FiBookmark as FiBookmarkIcon,
  FiStar as FiStarIcon,
  FiHeart as FiHeartIcon,
  FiThumbsUp as FiThumbsUpIcon,
  FiThumbsDown,
  FiMessageSquare,
  FiMessageCircle,
  FiMessageCircle as FiMessageCircleIcon,
  FiMessageSquare as FiMessageSquareIcon,
  FiMail as FiMailIcon,
  FiInbox,
  FiSend,
  FiArchive as FiArchiveIcon,
  FiAtSign,
  FiHash,
  FiHashtag,
  FiTag as FiTagIcon,
  FiTerminal,
  FiCrop,
  FiScissors,
  FiFilter as FiFilterIcon,
  FiLayers,
  FiLayers as FiLayersIcon,
  FiBox as FiBoxIcon,
  FiPackage as FiPackageIcon,
  FiTruck as FiTruckIcon,
  FiDollarSign as FiDollarSignIcon,
  FiCreditCard as FiCreditCardIcon,
  FiPercent as FiPercentIcon,
  FiTrendingUp as FiTrendingUpIcon,
  FiTrendingDown,
  FiBarChart as FiBarChartIcon,
  FiPieChart,
  FiLineChart,
  FiActivity as FiActivityIcon,
  FiAnchor as FiAnchorIcon,
  FiWatch as FiWatchIcon,
  FiWatchIcon as FiWatchIcon2,
  FiAirplay,
  FiCast,
  FiMonitor as FiMonitorIcon,
  FiSmartphone as FiSmartphoneIcon,
  FiTablet as FiTabletIcon,
  FiLaptop as FiLaptopIcon,
  FiPrinter as FiPrinterIcon,
  FiMousePointer as FiMousePointerIcon,
  FiKeyboard as FiKeyboardIcon,
  FiSpeaker as FiSpeakerIcon,
  FiHeadset as FiHeadsetIcon,
  FiMic as FiMicIcon,
  FiVideo as FiVideoIcon2,
  FiRadio as FiRadioIcon,
  FiTv as FiTvIcon,
  FiCamera as FiCameraIcon2,
  FiMusic as FiMusicIcon,
  FiPlay as FiPlayIcon,
  FiPause as FiPauseIcon2,
  FiSkipBack as FiSkipBackIcon,
  FiSkipForward as FiSkipForwardIcon,
  FiRewind as FiRewindIcon,
  FiFastForward as FiFastForwardIcon,
  FiVolume as FiVolumeIcon2,
  FiVolume1 as FiVolume1Icon,
  FiVolume2 as FiVolume2Icon,
  FiVolumeX as FiVolumeXIcon2,
  FiPlayCircle as FiPlayCircleIcon,
  FiStopCircle as FiStopCircleIcon2,
  FiFilm as FiFilmIcon,
  FiImage as FiImageIcon,
  FiFile as FiFileIcon,
  FiFolder as FiFolderIcon,
  FiFolderPlus as FiFolderPlusIcon,
  FiFilePlus as FiFilePlusIcon,
  FiTrash as FiTrashIcon2,
  FiSave as FiSaveIcon,
  FiDownloadCloud as FiDownloadCloudIcon,
  FiUploadCloud as FiUploadCloudIcon,
  FiFolderMinus as FiFolderMinusIcon,
  FiFileMinus as FiFileMinusIcon,
  FiEdit2 as FiEdit2Icon,
  FiEdit3 as FiEdit3Icon,
  FiType as FiTypeIcon,
  FiBold as FiBoldIcon,
  FiItalic as FiItalicIcon,
  FiUnderline as FiUnderlineIcon,
  FiStrikethrough as FiStrikethroughIcon,
  FiCode as FiCodeIcon,
  FiLink as FiLinkIcon,
  FiLink2 as FiLink2Icon,
  FiUnlink as FiUnlinkIcon,
  FiAlignLeft as FiAlignLeftIcon,
  FiAlignCenter as FiAlignCenterIcon,
  FiAlignRight as FiAlignRightIcon,
  FiAlignJustify as FiAlignJustifyIcon,
  FiList as FiListIcon2,
  FiGrid as FiGridIcon2,
  FiLayout as FiLayoutIcon,
  FiSidebar as FiSidebarIcon,
  FiMenu as FiMenuIcon,
  FiMoreHorizontal as FiMoreHorizontalIcon,
  FiMoreVertical as FiMoreVerticalIcon2,
  FiSliders as FiSlidersIcon,
  FiToggleLeft as FiToggleLeftIcon,
  FiToggleRight as FiToggleRightIcon,
  FiCheckSquare as FiCheckSquareIcon,
  FiSquare as FiSquareIcon,
  FiCircle as FiCircleIcon,
  FiTarget as FiTargetIcon,
  FiAperture as FiApertureIcon,
  FiCommand as FiCommandIcon,
  FiNavigation as FiNavigationIcon,
  FiNavigation2 as FiNavigation2Icon,
  FiCompass as FiCompassIcon,
  FiMap as FiMapIcon,
  FiGlobe as FiGlobeIcon2,
  FiFlag as FiFlagIcon,
  FiBookmark as FiBookmarkIcon2,
  FiStar as FiStarIcon2,
  FiHeart as FiHeartIcon2,
  FiThumbsUp as FiThumbsUpIcon2,
  FiThumbsDown as FiThumbsDownIcon,
  FiMessageSquare as FiMessageSquareIcon2,
  FiMessageCircle as FiMessageCircleIcon2,
  FiMail as FiMailIcon2,
  FiInbox as FiInboxIcon,
  FiSend as FiSendIcon,
  FiArchive as FiArchiveIcon2,
  FiAtSign as FiAtSignIcon,
  FiHash as FiHashIcon,
  FiHashtag as FiHashtagIcon,
  FiTag as FiTagIcon2,
  FiTerminal as FiTerminalIcon,
  FiCrop as FiCropIcon,
  FiScissors as FiScissorsIcon,
  FiFilter as FiFilterIcon2,
  FiLayers as FiLayersIcon2,
  FiBox as FiBoxIcon2,
  FiPackage as FiPackageIcon2,
  FiTruck as FiTruckIcon2,
  FiDollarSign as FiDollarSignIcon2,
  FiCreditCard as FiCreditCardIcon2,
  FiPercent as FiPercentIcon2,
  FiTrendingUp as FiTrendingUpIcon2,
  FiTrendingDown as FiTrendingDownIcon,
  FiBarChart as FiBarChartIcon2,
  FiPieChart as FiPieChartIcon,
  FiLineChart as FiLineChartIcon,
  FiActivity as FiActivityIcon2,
} from 'react-icons/fi';
import {
  MdAccessTime,
  MdDateRange,
  MdLocalHospital,
  MdHealthAndSafety,
  MdEmergency,
  MdPayment,
  MdVerifiedUser,
  MdSchool,
  MdWork,
  MdLanguage,
  MdLocationOn,
  MdScreenShare,
  MdRecordVoiceOver,
  MdVideocam,
  MdVideocamOff,
  MdCall,
  MdCallEnd,
  MdChat,
  MdAttachFile,
  MdEmojiEmotions,
  MdSend,
  MdNotifications,
  MdPeople,
  MdHistory,
  MdSchedule,
  MdCheckCircle,
  MdCancel,
  MdPending,
  MdMedicalServices,
  MdLocalShipping,
  MdInventory,
  MdReceipt,
  MdDescription,
  MdWarning,
  MdInfo,
  MdDelete,
  MdEdit,
  MdVisibility,
  MdVisibilityOff,
  MdAdd,
  MdRemove,
  MdArrowBack,
  MdArrowForward,
  MdArrowUpward,
  MdArrowDownward,
  MdRefresh,
  MdClose,
  MdMenu,
  MdMoreVert,
  MdMoreHoriz,
  MdExpandMore,
  MdExpandLess,
  MdChevronRight,
  MdChevronLeft,
  MdChevronUp,
  MdChevronDown,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
  MdToggleOn,
  MdToggleOff,
  MdStar,
  MdStarBorder,
  MdFavorite,
  MdFavoriteBorder,
  MdThumbUp,
  MdThumbDown,
  MdShare,
  MdReply,
  MdForward,
  MdContentCopy,
  MdPrint,
  MdDownload,
  MdUpload,
  MdCloud,
  MdCloudQueue,
  MdCloudDone,
  MdCloudOff,
  MdWifi,
  MdWifiOff,
  MdBluetooth,
  MdBluetoothDisabled,
  MdSignalCellular4Bar,
  MdSignalCellularOff,
  MdBatteryFull,
  MdBatteryChargingFull,
  MdBatteryStd,
  MdBatteryAlert,
  MdPower,
  MdPowerOff,
  MdLock,
  MdLockOpen,
  MdLockOutline,
  MdVpnKey,
  MdSecurity,
  MdVerified,
  MdError,
  MdErrorOutline,
  MdWarning as MdWarningIcon,
  MdInfo as MdInfoIcon,
  MdHelp,
  MdHelpOutline,
  MdFeedback,
  MdRateReview,
  MdQuestionAnswer,
  MdForum,
  MdChatBubble,
  MdChatBubbleOutline,
  MdComment,
  MdComment as MdCommentIcon,
  MdFormatQuote,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdFormatColorText,
  MdFormatColorFill,
  MdFormatSize,
  MdInsertPhoto,
  MdInsertLink,
  MdInsertChart,
  MdInsertDriveFile,
  MdAttachMoney,
  MdEuro,
  MdPound,
  MdYen,
  MdRupee,
  MdCurrencyBitcoin,
  MdMonetizationOn,
  MdAccountBalance,
  MdAccountBalanceWallet,
  MdShoppingCart,
  MdShoppingBasket,
  MdStore,
  MdStorefront,
  MdLocalOffer,
  MdLocalGroceryStore,
  MdLocalGasStation,
  MdLocalCarWash,
  MdLocalAtm,
  MdLocalBar,
  MdLocalCafe,
  MdLocalDining,
  MdLocalDrink,
  MdLocalFlorist,
  MdLocalHospital as MdLocalHospitalIcon,
  MdLocalHotel,
  MdLocalLaundryService,
  MdLocalLibrary,
  MdLocalMall,
  MdLocalMovies,
  MdLocalParking,
  MdLocalPharmacy,
  MdLocalPhone,
  MdLocalPizza,
  MdLocalPostOffice,
  MdLocalPrintshop,
  MdLocalSee,
  MdLocalShipping as MdLocalShippingIcon,
  MdLocalTaxi,
  MdDirections,
  Directions,
  DirectionsCar,
  DirectionsBus,
  DirectionsBike,
  DirectionsWalk,
  DirectionsTransit,
  DirectionsRailway,
  DirectionsSubway,
  DirectionsBoat,
  DirectionsRun,
  Flight,
  FlightTakeoff,
  FlightLand,
  Hotel,
  Restaurant,
  RestaurantMenu,
  Cafe,
  Bar,
  LocalBar as LocalBarIcon,
  LocalCafe as LocalCafeIcon,
  LocalDining as LocalDiningIcon,
  LocalDrink as LocalDrinkIcon,
  LocalFlorist as LocalFloristIcon,
  LocalHospital as LocalHospitalIcon,
  LocalHotel as LocalHotelIcon,
  LocalLaundryService as LocalLaundryServiceIcon,
  LocalLibrary as LocalLibraryIcon,
  LocalMall as LocalMallIcon,
  LocalMovies as LocalMoviesIcon,
  LocalParking as LocalParkingIcon,
  LocalPharmacy as LocalPharmacyIcon,
  LocalPhone as LocalPhoneIcon,
  LocalPizza as LocalPizzaIcon,
  LocalPostOffice as LocalPostOfficeIcon,
  LocalPrintshop as LocalPrintshopIcon,
  LocalSee as LocalSeeIcon,
  LocalShipping as LocalShippingIcon,
  LocalTaxi as LocalTaxiIcon,
  MdOutlineLocalPharmacy,
} from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { useHospitalDataContext } from '../context/HospitalDataContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, addDays, addHours, isToday, isTomorrow } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

// Medicine Card Component
const MedicineCard = ({ medicine, onAddToCart, onViewDetails }) => {
  const { user, requireLogin } = useAuth();
  const toast = useToast();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const [quantity, setQuantity] = useState(1);
  const [isExpiring, setIsExpiring] = useState(false);

  useEffect(() => {
    const expiryDate = new Date(medicine.expiryDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    setIsExpiring(expiryDate <= threeMonthsFromNow);
  }, [medicine.expiryDate]);

  const handleAddToCart = () => {
    if (!user) {
      requireLogin(() => {
        handleAddToCart();
      });
      return;
    }

    const cartItem = {
      ...medicine,
      quantity,
      addedAt: new Date().toISOString(),
      totalPrice: medicine.price * quantity,
    };

    onAddToCart(cartItem);
    toast({
      title: 'Added to Cart',
      description: `${quantity} ${medicine.name} added to cart`,
      status: 'success',
      duration: 2000,
      position: 'top-right',
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Anti-diabetic': 'green',
      'Cholesterol': 'blue',
      'Anti-hypertensive': 'red',
      'Respiratory': 'purple',
      'Antibiotic': 'orange',
      'Pain Relief': 'yellow',
      'Vitamin': 'teal',
      'Other': 'gray'
    };
    return colors[category] || 'gray';
  };

  const isLowStock = medicine.stock < 50;

  return (
    <Card
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
      position="relative"
    >
      {/* Stock Badge */}
      {isLowStock && (
        <Badge
          position="absolute"
          top="2"
          right="2"
          colorScheme="red"
          borderRadius="full"
          px={2}
          py={1}
          fontSize="xs"
          zIndex={1}
        >
          Low Stock
        </Badge>
      )}

      {isExpiring && (
        <Badge
          position="absolute"
          top="2"
          right="2"
          colorScheme="orange"
          borderRadius="full"
          px={2}
          py={1}
          fontSize="xs"
          zIndex={1}
        >
          Expiring Soon
        </Badge>
      )}

      <CardBody>
        <VStack spacing={4} align="stretch">
          {/* Medicine Header */}
          <HStack spacing={3}>
            <Box
              w="12"
              h="12"
              borderRadius="lg"
              bg="blue.50"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <MdOutlineLocalPharmacy size={24} color="var(--chakra-colors-blue-500)" />
            </Box>
            <Box flex={1}>
              <Heading size="md">{medicine.name}</Heading>
              <Badge colorScheme={getCategoryColor(medicine.category)} mt={1}>
                {medicine.category}
              </Badge>
            </Box>
          </HStack>

          {/* Details */}
          <VStack spacing={2} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.600">Manufacturer:</Text>
              <Text fontSize="sm" fontWeight="medium">{medicine.manufacturer}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.600">Type:</Text>
              <Text fontSize="sm" fontWeight="medium">{medicine.type}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.600">Stock:</Text>
              <Text fontSize="sm" fontWeight="medium" color={isLowStock ? 'red.500' : 'green.500'}>
                {medicine.stock} {medicine.unit}
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.600">Expiry:</Text>
              <Text fontSize="sm" fontWeight="medium">{format(new Date(medicine.expiryDate), 'MMM yyyy')}</Text>
            </HStack>
          </VStack>

          {/* Price */}
          <Box textAlign="center" py={2} bg="green.50" borderRadius="md">
            <Text fontSize="xs" color="gray.600">Price per {medicine.unit}</Text>
            <Text fontSize="2xl" fontWeight="bold" color="green.600">
              ₹{medicine.price}
            </Text>
          </Box>

          {/* Quantity Selector */}
          <FormControl>
            <FormLabel fontSize="sm">Quantity</FormLabel>
            <HStack spacing={3}>
              <IconButton
                icon={<FiMinus />}
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                isDisabled={quantity <= 1}
              />
              <NumberInput
                value={quantity}
                onChange={(value) => setQuantity(Math.max(1, parseInt(value) || 1))}
                min={1}
                max={medicine.stock}
                size="sm"
                w="80px"
              >
                <NumberInputField textAlign="center" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <IconButton
                icon={<FiPlus />}
                size="sm"
                onClick={() => setQuantity(Math.min(medicine.stock, quantity + 1))}
                aria-label="Increase quantity"
                isDisabled={quantity >= medicine.stock}
              />
            </HStack>
            <FormHelperText fontSize="xs">
              Max: {medicine.stock} {medicine.unit} available
            </FormHelperText>
          </FormControl>

          {/* Total Price */}
          <Box textAlign="center">
            <Text fontSize="sm" color="gray.600">Total:</Text>
            <Text fontSize="lg" fontWeight="bold" color="blue.600">
              ₹{medicine.price * quantity}
            </Text>
          </Box>
        </VStack>
      </CardBody>

      <CardFooter borderTop="1px" borderColor={borderColor} pt={3}>
        <SimpleGrid columns={2} spacing={3} w="100%">
          <Button
            colorScheme="blue"
            size="sm"
            leftIcon={<FiShoppingCart />}
            onClick={handleAddToCart}
            isDisabled={medicine.stock === 0}
          >
            {medicine.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(medicine)}
          >
            Details
          </Button>
        </SimpleGrid>
      </CardFooter>
    </Card>
  );
};

// Shopping Cart Component
const ShoppingCart = ({ cartItems, onUpdateCart, onCheckout, onClose }) => {
  const { user } = useAuth();
  const toast = useToast();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateCart(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    onUpdateCart(itemId, 0);
    toast({
      title: 'Item Removed',
      description: 'Item removed from cart',
      status: 'info',
      duration: 2000,
    });
  };

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to proceed with checkout',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    onCheckout();
  };

  return (
    <Card h="100%" display="flex" flexDirection="column">
      <CardHeader borderBottom="1px" borderColor={borderColor}>
        <HStack justify="space-between">
          <Heading size="md">Shopping Cart</Heading>
          <Badge colorScheme="blue">{cartItems.length} items</Badge>
        </HStack>
      </CardHeader>

      <CardBody flex={1} overflowY="auto">
        {cartItems.length === 0 ? (
          <VStack spacing={4} py={10} textAlign="center">
            <FiShoppingCart size={48} color="gray.400" />
            <Text color="gray.600">Your cart is empty</Text>
            <Text fontSize="sm" color="gray.500">Add medicines from the catalog</Text>
          </VStack>
        ) : (
          <VStack spacing={4} align="stretch">
            {cartItems.map((item) => (
              <Card key={item.id} variant="outline">
                <CardBody>
                  <HStack spacing={4} align="start">
                    <Box
                      w="12"
                      h="12"
                      borderRadius="lg"
                      bg="blue.50"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <MdOutlineLocalPharmacy size={20} color="var(--chakra-colors-blue-500)" />
                    </Box>
                    <Box flex={1}>
                      <HStack justify="space-between">
                        <Text fontWeight="medium">{item.name}</Text>
                        <IconButton
                          icon={<FiX />}
                          size="xs"
                          variant="ghost"
                          onClick={() => handleRemoveItem(item.id)}
                          aria-label="Remove item"
                        />
                      </HStack>
                      <Text fontSize="sm" color="gray.600">{item.manufacturer}</Text>
                      <Text fontSize="xs" color="gray.500">{item.category}</Text>
                    </Box>
                    <VStack align="end" spacing={1}>
                      <Text fontWeight="bold" color="green.600">₹{item.price * item.quantity}</Text>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiMinus />}
                          size="xs"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        />
                        <Text fontSize="sm">{item.quantity}</Text>
                        <IconButton
                          icon={<FiPlus />}
                          size="xs"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        />
                      </HStack>
                      <Text fontSize="xs" color="gray.500">₹{item.price} each</Text>
                    </VStack>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        )}
      </CardBody>

      {cartItems.length > 0 && (
        <CardFooter borderTop="1px" borderColor={borderColor}>
          <VStack spacing={4} w="100%">
            {/* Order Summary */}
            <VStack spacing={2} w="100%">
              <HStack justify="space-between" w="100%">
                <Text fontSize="sm">Subtotal</Text>
                <Text fontWeight="medium">₹{subtotal.toFixed(2)}</Text>
              </HStack>
              <HStack justify="space-between" w="100%">
                <Text fontSize="sm">Shipping</Text>
                <Text fontWeight="medium" color={shipping === 0 ? 'green.500' : 'inherit'}>
                  {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                </Text>
              </HStack>
              <HStack justify="space-between" w="100%">
                <Text fontSize="sm">Tax (18%)</Text>
                <Text fontWeight="medium">₹{tax.toFixed(2)}</Text>
              </HStack>
              <Divider />
              <HStack justify="space-between" w="100%">
                <Text fontSize="lg" fontWeight="bold">Total</Text>
                <Text fontSize="lg" fontWeight="bold" color="green.600">
                  ₹{total.toFixed(2)}
                </Text>
              </HStack>
            </VStack>

            {/* Action Buttons */}
            <SimpleGrid columns={2} spacing={3} w="100%">
              <Button
                colorScheme="blue"
                onClick={handleCheckout}
                isDisabled={!user}
              >
                {user ? 'Proceed to Checkout' : 'Login to Checkout'}
              </Button>
              <Button variant="outline" onClick={onClose}>
                Continue Shopping
              </Button>
            </SimpleGrid>

            {/* Offers */}
            <Alert status="info" borderRadius="md" fontSize="sm">
              <AlertIcon />
              <Box>
                <Text fontWeight="medium">Free shipping on orders above ₹500</Text>
                <Text fontSize="xs">Use code: PHARMA10 for 10% off</Text>
              </Box>
            </Alert>
          </VStack>
        </CardFooter>
      )}
    </Card>
  );
};

// Checkout Component
const CheckoutComponent = ({ cartItems, onComplete, onBack }) => {
  const { user } = useAuth();
  const toast = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [address, setAddress] = useState(user?.address || '');
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = deliveryOption === 'express' ? 100 : (subtotal > 500 ? 0 : 50);
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const deliveryOptions = [
    { value: 'standard', label: 'Standard Delivery (3-5 days)', price: subtotal > 500 ? 'FREE' : '₹50' },
    { value: 'express', label: 'Express Delivery (1-2 days)', price: '₹100' },
    { value: 'pickup', label: 'Store Pickup', price: 'FREE' },
  ];

  const paymentMethods = [
    { value: 'card', label: 'Credit/Debit Card', icon: FiCreditCard },
    { value: 'upi', label: 'UPI', icon: MdPayment },
    { value: 'netbanking', label: 'Net Banking', icon: MdReceipt },
    { value: 'cod', label: 'Cash on Delivery', icon: FiDollarSign },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please upload a file smaller than 5MB',
          status: 'error',
          duration: 3000,
        });
        return;
      }
      setPrescriptionFile(file);
      toast({
        title: 'Prescription uploaded',
        description: 'Your prescription has been uploaded successfully',
        status: 'success',
        duration: 2000,
      });
    }
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      toast({
        title: 'Address Required',
        description: 'Please enter your delivery address',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      const order = {
        id: `ORD-${Date.now().toString().slice(-6)}`,
        items: cartItems,
        total,
        paymentMethod,
        deliveryOption,
        address,
        prescriptionFile: prescriptionFile?.name,
        createdAt: new Date().toISOString(),
        estimatedDelivery: addDays(new Date(), deliveryOption === 'express' ? 2 : 5),
      };

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('pharmacyOrders') || '[]');
      localStorage.setItem('pharmacyOrders', JSON.stringify([...existingOrders, order]));

      setIsProcessing(false);
      onComplete(order);
      
      toast({
        title: 'Order Placed Successfully!',
        description: `Order ID: ${order.id}`,
        status: 'success',
        duration: 5000,
      });
    }, 2000);
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <Heading size="md">Order Summary</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            {cartItems.map((item) => (
              <HStack key={item.id} justify="space-between">
                <Text fontSize="sm">{item.name} x{item.quantity}</Text>
                <Text fontSize="sm" fontWeight="medium">₹{item.price * item.quantity}</Text>
              </HStack>
            ))}
            <Divider />
            <HStack justify="space-between">
              <Text>Subtotal</Text>
              <Text fontWeight="medium">₹{subtotal.toFixed(2)}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Shipping</Text>
              <Text fontWeight="medium" color={shipping === 0 ? 'green.500' : 'inherit'}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Tax (18%)</Text>
              <Text fontWeight="medium">₹{tax.toFixed(2)}</Text>
            </HStack>
            <Divider />
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Total</Text>
              <Text fontSize="lg" fontWeight="bold" color="green.600">
                ₹{total.toFixed(2)}
              </Text>
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Delivery Address */}
      <Card>
        <CardHeader>
          <Heading size="md">Delivery Address</Heading>
        </CardHeader>
        <CardBody>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your complete delivery address"
              rows={3}
            />
          </FormControl>
        </CardBody>
      </Card>

      {/* Delivery Options */}
      <Card>
        <CardHeader>
          <Heading size="md">Delivery Options</Heading>
        </CardHeader>
        <CardBody>
          <RadioGroup value={deliveryOption} onChange={setDeliveryOption}>
            <Stack spacing={3}>
              {deliveryOptions.map((option) => (
                <Radio key={option.value} value={option.value}>
                  <HStack justify="space-between" w="100%">
                    <Text>{option.label}</Text>
                    <Badge colorScheme={option.price === 'FREE' ? 'green' : 'blue'}>
                      {option.price}
                    </Badge>
                  </HStack>
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </CardBody>
      </Card>

      {/* Prescription Upload */}
      <Card>
        <CardHeader>
          <Heading size="md">Prescription Upload</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
            <Text fontSize="sm" color="gray.600">
              Upload prescription for prescription medicines (Required for some medications)
            </Text>
            <Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
            />
            {prescriptionFile && (
              <Alert status="success" borderRadius="md">
                <AlertIcon />
                <Text fontSize="sm">Uploaded: {prescriptionFile.name}</Text>
              </Alert>
            )}
          </VStack>
        </CardBody>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <Heading size="md">Payment Method</Heading>
        </CardHeader>
        <CardBody>
          <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
            <SimpleGrid columns={2} spacing={4}>
              {paymentMethods.map((method) => (
                <Radio key={method.value} value={method.value}>
                  <HStack>
                    <Icon as={method.icon} />
                    <Text>{method.label}</Text>
                  </HStack>
                </Radio>
              ))}
            </SimpleGrid>
          </RadioGroup>
        </CardBody>
      </Card>

      {/* Action Buttons */}
      <HStack spacing={4} justify="space-between">
        <Button variant="outline" onClick={onBack} leftIcon={<FiArrowLeft />}>
          Back to Cart
        </Button>
        <Button
          colorScheme="green"
          size="lg"
          onClick={handlePlaceOrder}
          isLoading={isProcessing}
          loadingText="Placing Order..."
          rightIcon={<FiCheck />}
        >
          Place Order
        </Button>
      </HStack>
    </VStack>
  );
};

// Order Tracking Component
const OrderTracking = ({ orderId, onClose }) => {
  const [order, setOrder] = useState(null);
  const [trackingSteps, setTrackingSteps] = useState([]);

  useEffect(() => {
    // Simulate order tracking
    const steps = [
      { status: 'ordered', label: 'Order Placed', time: '10:30 AM', completed: true },
      { status: 'confirmed', label: 'Order Confirmed', time: '11:00 AM', completed: true },
      { status: 'processing', label: 'Processing', time: '11:30 AM', completed: true },
      { status: 'packed', label: 'Packed', time: '12:00 PM', completed: true },
      { status: 'shipped', label: 'Shipped', time: '02:00 PM', completed: false },
      { status: 'delivered', label: 'Delivered', time: 'Estimated: Tomorrow', completed: false },
    ];
    
    setTrackingSteps(steps);
    
    // Fetch order details
    const orders = JSON.parse(localStorage.getItem('pharmacyOrders') || '[]');
    const foundOrder = orders.find(o => o.id === orderId);
    setOrder(foundOrder);
  }, [orderId]);

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Order Tracking</Heading>
        {order && (
          <Text fontSize="sm" color="gray.600">
            Order ID: {order.id} | Placed on: {format(new Date(order.createdAt), 'PPp')}
          </Text>
        )}
      </CardHeader>
      <CardBody>
        <VStack spacing={6}>
          {/* Tracking Timeline */}
          <Box position="relative" w="100%">
            {trackingSteps.map((step, index) => (
              <HStack key={step.status} spacing={4} mb={6} position="relative">
                {/* Status Circle */}
                <Box
                  w="8"
                  h="8"
                  borderRadius="full"
                  bg={step.completed ? 'green.500' : 'gray.200'}
                  color={step.completed ? 'white' : 'gray.400'}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  zIndex={2}
                >
                  {step.completed ? <FiCheck /> : index + 1}
                </Box>
                
                {/* Step Details */}
                <Box flex={1}>
                  <Text fontWeight="medium">{step.label}</Text>
                  <Text fontSize="sm" color="gray.600">{step.time}</Text>
                </Box>
                
                {/* Connector Line */}
                {index < trackingSteps.length - 1 && (
                  <Box
                    position="absolute"
                    left="15px"
                    top="32px"
                    bottom="-28px"
                    w="2px"
                    bg={step.completed ? 'green.500' : 'gray.200'}
                    zIndex={1}
                  />
                )}
              </HStack>
            ))}
          </Box>

          {/* Order Details */}
          {order && (
            <SimpleGrid columns={2} spacing={4} w="100%">
              <Box p={3} bg="blue.50" borderRadius="md">
                <Text fontSize="sm" color="gray.600">Delivery Address</Text>
                <Text fontWeight="medium">{order.address}</Text>
              </Box>
              <Box p={3} bg="green.50" borderRadius="md">
                <Text fontSize="sm" color="gray.600">Estimated Delivery</Text>
                <Text fontWeight="medium">{format(order.estimatedDelivery, 'PP')}</Text>
              </Box>
            </SimpleGrid>
          )}
        </VStack>
      </CardBody>
      <CardFooter>
        <Button w="100%" onClick={onClose}>
          Close
        </Button>
      </CardFooter>
    </Card>
  );
};

// Medicine Details Modal
const MedicineDetailsModal = ({ medicine, isOpen, onClose }) => {
  const { user, requireLogin } = useAuth();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!user) {
      requireLogin(() => {
        handleAddToCart();
      });
      return;
    }

    const cartItem = {
      ...medicine,
      quantity,
      addedAt: new Date().toISOString(),
      totalPrice: medicine.price * quantity,
    };

    // Save to localStorage
    const existingCart = JSON.parse(localStorage.getItem('pharmacyCart') || '[]');
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem('pharmacyCart', JSON.stringify(updatedCart));

    toast({
      title: 'Added to Cart',
      description: `${quantity} ${medicine.name} added to cart`,
      status: 'success',
      duration: 2000,
    });
    
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Box
              w="10"
              h="10"
              borderRadius="lg"
              bg="blue.50"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <MdOutlineLocalPharmacy size={20} color="var(--chakra-colors-blue-500)" />
            </Box>
            <Text>{medicine?.name}</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {medicine && (
            <VStack spacing={6} align="stretch">
              <SimpleGrid columns={2} spacing={6}>
                <Box>
                  <Text fontWeight="bold" mb={2}>Manufacturer</Text>
                  <Text>{medicine.manufacturer}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={2}>Category</Text>
                  <Badge colorScheme="blue">{medicine.category}</Badge>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={2}>Type</Text>
                  <Text>{medicine.type}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={2}>Price</Text>
                  <Text color="green.600" fontWeight="bold">₹{medicine.price}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={2}>Stock</Text>
                  <Text color={medicine.stock < 50 ? 'red.500' : 'green.500'}>
                    {medicine.stock} {medicine.unit}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={2}>Expiry Date</Text>
                  <Text>{format(new Date(medicine.expiryDate), 'MMMM yyyy')}</Text>
                </Box>
              </SimpleGrid>

              <Divider />

              <Box>
                <Text fontWeight="bold" mb={2}>Description</Text>
                <Text color="gray.600">{medicine.description}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>Dosage</Text>
                <Text color="gray.600">{medicine.dosage}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>Storage Instructions</Text>
                <Text color="gray.600">{medicine.storage}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>Side Effects</Text>
                <Text color="gray.600">{medicine.sideEffects}</Text>
              </Box>

              <Divider />

              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <HStack spacing={3}>
                  <IconButton
                    icon={<FiMinus />}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  />
                  <NumberInput
                    value={quantity}
                    onChange={(value) => setQuantity(Math.max(1, parseInt(value) || 1))}
                    min={1}
                    max={medicine.stock}
                    w="100px"
                  >
                    <NumberInputField textAlign="center" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <IconButton
                    icon={<FiPlus />}
                    onClick={() => setQuantity(Math.min(medicine.stock, quantity + 1))}
                    aria-label="Increase quantity"
                  />
                </HStack>
              </FormControl>

              <Box textAlign="center">
                <Text fontSize="sm" color="gray.600">Total Price:</Text>
                <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                  ₹{medicine.price * quantity}
                </Text>
              </Box>

              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleAddToCart}
                leftIcon={<FiShoppingCart />}
                isDisabled={medicine.stock === 0}
              >
                {medicine.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// Main Pharmacy Page Component
const PharmacyPage = () => {
  const { user, requireLogin } = useAuth();
  const { getPharmacyItems } = useHospitalDataContext();
  const toast = useToast();
  const navigate = useNavigate();
  
  // States
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState('shop');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([10, 1000]);
  const [sortBy, setSortBy] = useState('name');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [orderIdToTrack, setOrderIdToTrack] = useState('');

  // Modal states
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();
  const { isOpen: isCheckoutOpen, onOpen: onCheckoutOpen, onClose: onCheckoutClose } = useDisclosure();
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
  const { isOpen: isOrderTrackOpen, onOpen: onOrderTrackOpen, onClose: onOrderTrackClose } = useDisclosure();
  const { isOpen: isOrderHistoryOpen, onOpen: onOrderHistoryOpen, onClose: onOrderHistoryClose } = useDisclosure();
  
  const [currentOrder, setCurrentOrder] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [prescriptionRequired, setPrescriptionRequired] = useState(false);

  // Load medicines
  useEffect(() => {
    const loadMedicines = async () => {
      try {
        setLoading(true);
        const pharmacyItems = getPharmacyItems?.() || [];
        
        // Transform pharmacy data
        const medicineList = pharmacyItems.map(item => ({
          id: item.id,
          name: item.name,
          manufacturer: item.manufacturer,
          type: item.type,
          category: item.category,
          stock: item.stock,
          unit: item.unit,
          price: item.price,
          expiryDate: item.expiryDate,
          requiresPrescription: ['Antibiotic', 'Psychiatric'].includes(item.category),
          description: `${item.type} for ${item.category.toLowerCase()}. Manufactured by ${item.manufacturer}.`,
          sideEffects: 'May cause mild side effects. Consult your doctor if symptoms persist.',
          dosage: 'As prescribed by your healthcare provider',
          storage: 'Store in a cool, dry place away from direct sunlight',
        }));
        
        setMedicines(medicineList);
        setFilteredMedicines(medicineList);
      } catch (error) {
        console.error('Error loading medicines:', error);
        toast({
          title: 'Error',
          description: 'Failed to load medicines',
          status: 'error',
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    loadMedicines();
    
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('pharmacyCart') || '[]');
    setCartItems(savedCart);
    
    // Load user orders
    if (user) {
      const orders = JSON.parse(localStorage.getItem('pharmacyOrders') || '[]');
      setUserOrders(orders);
    }
  }, [getPharmacyItems, toast, user]);

  // Filter medicines
  useEffect(() => {
    let filtered = [...medicines];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(medicine =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(medicine => medicine.category === selectedCategory);
    }
    
    // Price filter
    filtered = filtered.filter(medicine => medicine.price >= priceRange[0] && medicine.price <= priceRange[1]);
    
    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'stock') return b.stock - a.stock;
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });
    
    setFilteredMedicines(filtered);
  }, [searchQuery, selectedCategory, priceRange, sortBy, medicines]);

  // Check for prescription requirements
  useEffect(() => {
    const hasPrescriptionRequired = cartItems.some(item => item.requiresPrescription);
    setPrescriptionRequired(hasPrescriptionRequired);
  }, [cartItems]);

  const categories = ['all', ...Array.from(new Set(medicines.map(m => m.category)))];

  const handleAddToCart = (item) => {
    if (!user) {
      requireLogin(() => {
        handleAddToCart(item);
      });
      return;
    }

    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const handleUpdateCart = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleCheckout = () => {
    if (!user) {
      requireLogin(() => {
        handleCheckout();
      });
      return;
    }
    
    if (cartItems.length === 0) {
      toast({
        title: 'Cart Empty',
        description: 'Add items to cart before checkout',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    
    onCartClose();
    onCheckoutOpen();
  };

  const handleOrderComplete = (order) => {
    setCurrentOrder(order);
    setCartItems([]);
    setUserOrders(prev => [order, ...prev]);
    onCheckoutClose();
    
    toast({
      title: 'Order Placed Successfully!',
      description: (
        <VStack align="start">
          <Text>Order ID: {order.id}</Text>
          <Text fontSize="sm">Estimated Delivery: {format(order.estimatedDelivery, 'PPP')}</Text>
          <Button
            size="sm"
            mt={2}
            onClick={() => {
              setOrderIdToTrack(order.id);
              onOrderTrackOpen();
            }}
          >
            Track Order
          </Button>
        </VStack>
      ),
      status: 'success',
      duration: 8000,
      isClosable: true,
    });
  };

  const handleTrackOrder = () => {
    if (!orderIdToTrack.trim()) {
      toast({
        title: 'Order ID Required',
        description: 'Please enter your order ID',
        status: 'error',
        duration: 3000,
      });
      return;
    }
    
    const orders = JSON.parse(localStorage.getItem('pharmacyOrders') || '[]');
    const orderExists = orders.some(order => order.id === orderIdToTrack);
    
    if (!orderExists) {
      toast({
        title: 'Order Not Found',
        description: 'Please check your order ID',
        status: 'error',
        duration: 3000,
      });
      return;
    }
    
    onOrderTrackOpen();
  };

  const handleViewMedicineDetails = (medicine) => {
    setSelectedMedicine(medicine);
    onDetailsOpen();
  };

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Header */}
      <Box bg="white" shadow="sm" borderBottom="1px" borderColor={borderColor}>
        <Container maxW="full">
          <Flex h="16" alignItems="center" justifyContent="space-between">
            <HStack spacing={6}>
              <Button
                variant="ghost"
                leftIcon={<FiArrowLeft />}
                onClick={() => navigate('/')}
              >
                Back
              </Button>
              <Heading size="lg" color="blue.600">
                <HStack>
                  <MdLocalPharmacy />
                  <Text>MediCare Pharmacy</Text>
                </HStack>
              </Heading>
            </HStack>

            <HStack spacing={4}>
              <Button
                variant="outline"
                leftIcon={<MdHistory />}
                onClick={onOrderHistoryOpen}
                isDisabled={!user}
              >
                Orders
              </Button>
              
              <IconButton
                icon={<FiShoppingCart />}
                aria-label="Shopping Cart"
                colorScheme="blue"
                variant="ghost"
                onClick={onCartOpen}
                position="relative"
              >
                {cartItems.length > 0 && (
                  <Badge
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    colorScheme="red"
                    borderRadius="full"
                    fontSize="xs"
                    px={1}
                    py={0}
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </IconButton>

              {!user ? (
                <Button
                  colorScheme="blue"
                  leftIcon={<FiLogIn />}
                  onClick={() => requireLogin()}
                >
                  Login
                </Button>
              ) : (
                <Menu>
                  <MenuButton as={Button} rightIcon={<FiChevronDown />} variant="ghost">
                    <HStack>
                      <Avatar size="sm" name={user.name} src={user.avatar} />
                      <Text display={{ base: 'none', md: 'block' }}>{user.name}</Text>
                    </HStack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem icon={<FiUser />}>Profile</MenuItem>
                    <MenuItem icon={<MdHistory />} onClick={onOrderHistoryOpen}>
                      Order History
                    </MenuItem>
                    <MenuItem icon={<FiSettings />}>Settings</MenuItem>
                    <MenuDivider />
                    <MenuItem icon={<FiLogIn />} onClick={() => requireLogin()}>
                      Switch Account
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="full" py={8}>
        {/* Quick Stats */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={8}>
          <Card bg="blue.50" border="1px" borderColor="blue.100">
            <CardBody>
              <HStack>
                <Box
                  w="12"
                  h="12"
                  borderRadius="lg"
                  bg="blue.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FiPackage color="var(--chakra-colors-blue-600)" />
                </Box>
                <Box>
                  <Text fontSize="sm" color="blue.600">Total Products</Text>
                  <Text fontSize="2xl" fontWeight="bold">{medicines.length}</Text>
                </Box>
              </HStack>
            </CardBody>
          </Card>

          <Card bg="green.50" border="1px" borderColor="green.100">
            <CardBody>
              <HStack>
                <Box
                  w="12"
                  h="12"
                  borderRadius="lg"
                  bg="green.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FiShoppingCart color="var(--chakra-colors-green-600)" />
                </Box>
                <Box>
                  <Text fontSize="sm" color="green.600">In Cart</Text>
                  <Text fontSize="2xl" fontWeight="bold">{cartItems.length}</Text>
                </Box>
              </HStack>
            </CardBody>
          </Card>

          <Card bg="purple.50" border="1px" borderColor="purple.100">
            <CardBody>
              <HStack>
                <Box
                  w="12"
                  h="12"
                  borderRadius="lg"
                  bg="purple.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <MdReceipt color="var(--chakra-colors-purple-600)" />
                </Box>
                <Box>
                  <Text fontSize="sm" color="purple.600">Your Orders</Text>
                  <Text fontSize="2xl" fontWeight="bold">{userOrders.length}</Text>
                </Box>
              </HStack>
            </CardBody>
          </Card>

          <Card bg="orange.50" border="1px" borderColor="orange.100">
            <CardBody>
              <HStack>
                <Box
                  w="12"
                  h="12"
                  borderRadius="lg"
                  bg="orange.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FiTruck color="var(--chakra-colors-orange-600)" />
                </Box>
                <Box>
                  <Text fontSize="sm" color="orange.600">Fast Delivery</Text>
                  <Text fontSize="lg" fontWeight="bold">24-48 Hours</Text>
                </Box>
              </HStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Search and Filter Section */}
        <Card mb={8} shadow="md">
          <CardBody>
            <VStack spacing={6} align="stretch">
              {/* Search Bar */}
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search medicines by name, category, or manufacturer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fontSize="md"
                />
                {searchQuery && (
                  <InputRightElement>
                    <IconButton
                      icon={<FiX />}
                      size="sm"
                      variant="ghost"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                    />
                  </InputRightElement>
                )}
              </InputGroup>

              {/* Filters */}
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm">Category</FormLabel>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    size="md"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</FormLabel>
                  <RangeSlider
                    min={0}
                    max={2000}
                    step={10}
                    value={priceRange}
                    onChange={setPriceRange}
                  >
                    <RangeSliderTrack bg="gray.200">
                      <RangeSliderFilledTrack bg="blue.500" />
                    </RangeSliderTrack>
                    <RangeSliderThumb boxSize={6} index={0}>
                      <Box color="blue.500" />
                    </RangeSliderThumb>
                    <RangeSliderThumb boxSize={6} index={1}>
                      <Box color="blue.500" />
                    </RangeSliderThumb>
                  </RangeSlider>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Sort By</FormLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    size="md"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="stock">Stock (High to Low)</option>
                    <option value="category">Category</option>
                  </Select>
                </FormControl>
              </SimpleGrid>

              {/* Active Filters */}
              {(searchQuery || selectedCategory !== 'all' || priceRange[0] > 10 || priceRange[1] < 1000) && (
                <HStack spacing={2} flexWrap="wrap">
                  <Text fontSize="sm" color="gray.600">Active Filters:</Text>
                  {searchQuery && (
                    <Badge colorScheme="blue">
                      Search: {searchQuery}
                      <CloseButton size="xs" ml={2} onClick={() => setSearchQuery('')} />
                    </Badge>
                  )}
                  {selectedCategory !== 'all' && (
                    <Badge colorScheme="green">
                      Category: {selectedCategory}
                      <CloseButton size="xs" ml={2} onClick={() => setSelectedCategory('all')} />
                    </Badge>
                  )}
                  {(priceRange[0] > 10 || priceRange[1] < 1000) && (
                    <Badge colorScheme="purple">
                      Price: ₹{priceRange[0]}-{priceRange[1]}
                      <CloseButton size="xs" ml={2} onClick={() => setPriceRange([10, 1000])} />
                    </Badge>
                  )}
                </HStack>
              )}
            </VStack>
          </CardBody>
        </Card>

        {/* Main Content */}
        <Tabs variant="enclosed" colorScheme="blue" mb={8}>
          <TabList>
            <Tab fontWeight="semibold">
              <HStack>
                <FiGrid />
                <Text>Shop Medicines</Text>
                <Badge ml={2} colorScheme="blue">{filteredMedicines.length}</Badge>
              </HStack>
            </Tab>
            <Tab fontWeight="semibold" isDisabled={!user}>
              <HStack>
                <MdHistory />
                <Text>Order History</Text>
                {user && <Badge ml={2} colorScheme="green">{userOrders.length}</Badge>}
              </HStack>
            </Tab>
            <Tab fontWeight="semibold">
              <HStack>
                <FiTruck />
                <Text>Track Order</Text>
              </HStack>
            </Tab>
          </TabList>

          <TabPanels>
            {/* Shop Panel */}
            <TabPanel p={0}>
              {loading ? (
                <Center py={20}>
                  <VStack spacing={4}>
                    <Spinner size="xl" color="blue.500" />
                    <Text color="gray.600">Loading medicines...</Text>
                  </VStack>
                </Center>
              ) : filteredMedicines.length === 0 ? (
                <Card py={20}>
                  <CardBody>
                    <VStack spacing={4} textAlign="center">
                      <FiPackage size={64} color="gray.400" />
                      <Heading size="md" color="gray.600">No medicines found</Heading>
                      <Text color="gray.500">Try adjusting your search or filters</Text>
                      <Button
                        colorScheme="blue"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                          setPriceRange([10, 1000]);
                        }}
                      >
                        Clear All Filters
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
                  {filteredMedicines.map(medicine => (
                    <MedicineCard
                      key={medicine.id}
                      medicine={medicine}
                      onAddToCart={handleAddToCart}
                      onViewDetails={handleViewMedicineDetails}
                    />
                  ))}
                </SimpleGrid>
              )}
            </TabPanel>

            {/* Order History Panel */}
            <TabPanel p={0}>
              {!user ? (
                <Card py={20}>
                  <CardBody>
                    <VStack spacing={4} textAlign="center">
                      <FiLogIn size={64} color="gray.400" />
                      <Heading size="md" color="gray.600">Please Login</Heading>
                      <Text color="gray.500">Login to view your order history</Text>
                      <Button colorScheme="blue" onClick={() => requireLogin()}>
                        Login Now
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              ) : userOrders.length === 0 ? (
                <Card py={20}>
                  <CardBody>
                    <VStack spacing={4} textAlign="center">
                      <MdReceipt size={64} color="gray.400" />
                      <Heading size="md" color="gray.600">No Orders Yet</Heading>
                      <Text color="gray.500">Start shopping to see your orders here</Text>
                      <Button colorScheme="blue" onClick={() => setActiveTab(0)}>
                        Shop Now
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              ) : (
                <VStack spacing={4} align="stretch">
                  {userOrders.map(order => (
                    <Card key={order.id} shadow="sm">
                      <CardBody>
                        <HStack justify="space-between" mb={4}>
                          <VStack align="start" spacing={1}>
                            <HStack>
                              <Text fontWeight="bold">Order ID: {order.id}</Text>
                              <Badge colorScheme="green">Placed</Badge>
                            </HStack>
                            <Text fontSize="sm" color="gray.600">
                              {format(new Date(order.createdAt), 'PPpp')}
                            </Text>
                          </VStack>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setOrderIdToTrack(order.id);
                              onOrderTrackOpen();
                            }}
                          >
                            Track Order
                          </Button>
                        </HStack>
                        
                        <Divider mb={4} />
                        
                        <SimpleGrid columns={2} spacing={4}>
                          <Box>
                            <Text fontSize="sm" color="gray.600">Total Amount</Text>
                            <Text fontSize="lg" fontWeight="bold" color="green.600">
                              ₹{order.total.toFixed(2)}
                            </Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" color="gray.600">Payment Method</Text>
                            <Text>{order.paymentMethod}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" color="gray.600">Delivery</Text>
                            <Text>{order.deliveryOption}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" color="gray.600">Est. Delivery</Text>
                            <Text>{format(order.estimatedDelivery, 'PPP')}</Text>
                          </Box>
                        </SimpleGrid>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              )}
            </TabPanel>

            {/* Track Order Panel */}
            <TabPanel p={0}>
              <Card>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <Heading size="md">Track Your Order</Heading>
                    <Text color="gray.600">
                      Enter your order ID to track the status of your delivery
                    </Text>
                    
                    <InputGroup size="lg">
                      <InputLeftElement pointerEvents="none">
                        <MdReceipt color="gray.400" />
                      </InputLeftElement>
                      <Input
                        placeholder="Enter Order ID (e.g., ORD-123456)"
                        value={orderIdToTrack}
                        onChange={(e) => setOrderIdToTrack(e.target.value.toUpperCase())}
                      />
                      <InputRightElement width="auto">
                        <Button
                          colorScheme="blue"
                          size="md"
                          mr={2}
                          onClick={handleTrackOrder}
                          isDisabled={!orderIdToTrack.trim()}
                        >
                          Track
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    
                    <Text fontSize="sm" color="gray.500">
                      Your order ID was sent to your email when you placed the order
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Quick Actions */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={8}>
          <Card
            bg="blue.50"
            border="1px"
            borderColor="blue.200"
            cursor="pointer"
            _hover={{ shadow: 'md' }}
            onClick={onCartOpen}
          >
            <CardBody>
              <HStack>
                <Box
                  w="12"
                  h="12"
                  borderRadius="lg"
                  bg="blue.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FiShoppingCart color="var(--chakra-colors-blue-600)" />
                </Box>
                <Box>
                  <Text fontWeight="bold">View Cart</Text>
                  <Text fontSize="sm" color="gray.600">{cartItems.length} items</Text>
                </Box>
              </HStack>
            </CardBody>
          </Card>

          <Card
            bg="green.50"
            border="1px"
            borderColor="green.200"
            cursor="pointer"
            _hover={{ shadow: 'md' }}
            onClick={() => {
              if (cartItems.length > 0) {
                handleCheckout();
              } else {
                toast({
                  title: 'Cart Empty',
                  description: 'Add items to cart first',
                  status: 'warning',
                });
              }
            }}
          >
            <CardBody>
              <HStack>
                <Box
                  w="12"
                  h="12"
                  borderRadius="lg"
                  bg="green.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FiCreditCard color="var(--chakra-colors-green-600)" />
                </Box>
                <Box>
                  <Text fontWeight="bold">Checkout</Text>
                  <Text fontSize="sm" color="gray.600">Proceed to payment</Text>
                </Box>
              </HStack>
            </CardBody>
          </Card>

          <Card
            bg="purple.50"
            border="1px"
            borderColor="purple.200"
            cursor="pointer"
            _hover={{ shadow: 'md' }}
            onClick={() => {
              setOrderIdToTrack('');
              setActiveTab(2);
            }}
          >
            <CardBody>
              <HStack>
                <Box
                  w="12"
                  h="12"
                  borderRadius="lg"
                  bg="purple.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FiTruck color="var(--chakra-colors-purple-600)" />
                </Box>
                <Box>
                  <Text fontWeight="bold">Track Order</Text>
                  <Text fontSize="sm" color="gray.600">Check delivery status</Text>
                </Box>
              </HStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Information Section */}
        <Card mb={8}>
          <CardHeader>
            <Heading size="md">Pharmacy Information</Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <VStack align="start" spacing={3}>
                <HStack>
                  <FiClock color="var(--chakra-colors-blue-500)" />
                  <Text fontWeight="medium">Timings</Text>
                </HStack>
                <Text fontSize="sm" color="gray.600">
                  Monday - Sunday: 6:00 AM - 12:00 AM
                </Text>
              </VStack>

              <VStack align="start" spacing={3}>
                <HStack>
                  <FiTruck color="var(--chakra-colors-green-500)" />
                  <Text fontWeight="medium">Delivery</Text>
                </HStack>
                <Text fontSize="sm" color="gray.600">
                  Free delivery on orders above ₹500
                </Text>
              </VStack>

              <VStack align="start" spacing={3}>
                <HStack>
                  <FiShield color="var(--chakra-colors-purple-500)" />
                  <Text fontWeight="medium">Quality Guarantee</Text>
                </HStack>
                <Text fontSize="sm" color="gray.600">
                  100% genuine medicines from licensed manufacturers
                </Text>
              </VStack>
            </SimpleGrid>
          </CardBody>
        </Card>
      </Container>

      {/* Modals */}
      
      {/* Cart Drawer */}
      <Drawer
        isOpen={isCartOpen}
        placement="right"
        onClose={onCartClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Your Shopping Cart</DrawerHeader>
          <DrawerBody p={0}>
            <ShoppingCart
              cartItems={cartItems}
              onUpdateCart={handleUpdateCart}
              onCheckout={handleCheckout}
              onClose={onCartClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Checkout Modal */}
      <Modal isOpen={isCheckoutOpen} onClose={onCheckoutClose} size="full" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <FiCreditCard />
              <Text>Checkout</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <Container maxW="3xl">
              <CheckoutComponent
                cartItems={cartItems}
                onComplete={handleOrderComplete}
                onBack={() => {
                  onCheckoutClose();
                  onCartOpen();
                }}
              />
            </Container>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Medicine Details Modal */}
      <MedicineDetailsModal
        medicine={selectedMedicine}
        isOpen={isDetailsOpen}
        onClose={onDetailsClose}
      />

      {/* Order Tracking Modal */}
      <Modal isOpen={isOrderTrackOpen} onClose={onOrderTrackClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Tracking</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <OrderTracking
              orderId={orderIdToTrack}
              onClose={onOrderTrackClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Order History Modal */}
      <Modal isOpen={isOrderHistoryOpen} onClose={onOrderHistoryClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order History</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            {!user ? (
              <VStack spacing={4} py={10} textAlign="center">
                <FiLogIn size={48} color="gray.400" />
                <Text color="gray.600">Please login to view order history</Text>
                <Button colorScheme="blue" onClick={() => requireLogin()}>
                  Login
                </Button>
              </VStack>
            ) : userOrders.length === 0 ? (
              <VStack spacing={4} py={10} textAlign="center">
                <MdReceipt size={48} color="gray.400" />
                <Text color="gray.600">No orders yet</Text>
                <Button colorScheme="blue" onClick={onOrderHistoryClose}>
                  Start Shopping
                </Button>
              </VStack>
            ) : (
              <VStack spacing={4} align="stretch">
                {userOrders.map(order => (
                  <Card key={order.id} shadow="sm">
                    <CardBody>
                      <HStack justify="space-between" mb={4}>
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="bold">Order ID: {order.id}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {format(new Date(order.createdAt), 'PPpp')}
                          </Text>
                        </VStack>
                        <Badge colorScheme="green">₹{order.total.toFixed(2)}</Badge>
                      </HStack>
                      
                      <Divider mb={4} />
                      
                      {order.items.map(item => (
                        <HStack key={item.id} mb={2} justify="space-between">
                          <Text fontSize="sm">{item.name} x{item.quantity}</Text>
                          <Text fontSize="sm" fontWeight="medium">₹{item.price * item.quantity}</Text>
                        </HStack>
                      ))}
                      
                      <Divider my={4} />
                      
                      <HStack justify="space-between">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setOrderIdToTrack(order.id);
                            onOrderHistoryClose();
                            onOrderTrackOpen();
                          }}
                        >
                          Track Order
                        </Button>
                        <Button size="sm" colorScheme="blue">
                          Download Invoice
                        </Button>
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Prescription Alert */}
      {prescriptionRequired && (
        <Alert status="warning" position="sticky" bottom="0" borderRadius="none">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Prescription Required</AlertTitle>
            <AlertDescription>
              Some items in your cart require a prescription. Please upload your prescription during checkout.
            </AlertDescription>
          </Box>
          <Button size="sm" colorScheme="orange" onClick={onCartOpen}>
            View Cart
          </Button>
        </Alert>
      )}

      {/* Floating Cart Button */}
      {!isCartOpen && cartItems.length > 0 && (
        <Box position="fixed" top="36" right="6" zIndex={10020}>
          <Button
            colorScheme="blue"
            size="lg"
            leftIcon={<FiShoppingCart />}
            onClick={onCartOpen}
            shadow="lg"
            borderRadius="full"
            px={6}
          >
            <HStack>
              <Text>Cart</Text>
              <Badge colorScheme="red" borderRadius="full" px={2}>
                {cartItems.length}
              </Badge>
            </HStack>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PharmacyPage;