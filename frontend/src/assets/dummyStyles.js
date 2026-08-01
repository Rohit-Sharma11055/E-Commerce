// Styles for Navbar component
export const navbarStyles = {
  // Navbar container style
  header: "sticky top-0 z-50 bg-cyan-100 border-b border-gray-100 shadow-sm",
  container: "flex items-center justify-between px-4 py-3 md:px-8 max-w-7xl mx-auto",
  
  // Logo styles
  logoContainer: "flex items-center cursor-pointer",
  logoImage: "w-16 h-12 rounded-xl overflow-hidden",
  logoText: "lg:text-2xl md:text-2xl text-1xl text-gray-900 font-[550] lobster-regular",

  // Navlinks styles
    navlinkContainer: "hidden lg:flex items-center gap-4",

    navLink: "flex items-center gap-1 text-gray-500 font-semibold tracking-wide text-sm hover:text-black transition-colors duration-200",

    activeNavLink: "flex items-center bg-lime-300 text-black px-3 py-2 rounded-full font-bold tracking-wider text-sm hover:bg-lime-400 transition-all duration-200",

    newBadge: "bg-lime-300 text-[5px] font-bold px-2 py-0.5 rounded-full",
  
  // User profile styles
  userContainer: "relative",
  userButton: "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer",
  userAvatar: "w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 text-white font-bold text-lg",
  statusIndicator: "absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white",
  userTextContainer: "text-left hidden md:block",
  userName: "text-sm font-medium text-gray-800 truncate max-w-[120px]",
  userEmail: "text-xs text-gray-500 truncate max-w-[120px]",
  chevronIcon: (isOpen) => `w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`,
  
  // Dropdown menu styles
  dropdownMenu: "absolute top-14 right-0 w-56 bg-cyan-100 rounded-xl shadow-lg border border-gray-100 z-50",
  dropdownHeader: "px-4 py-3 border-gray-100",
  dropdownAvatar: "w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg",
  dropdownName: "text-sm text-gray-800 ",
  dropdownEmail: "text-xs text-gray-500",
  
  // Menu items
  menuItemContainer: "p-1.5",
  menuItem: "w-full px-4 py-3 text-left hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-3 rounded-lg",
  menuItemBorder: "p-1.5 border-t border-gray-100",
  logoutButton: "flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-red-50 text-red-600 rounded-lg"
};


//Styles for Sidebar component
export const sidebarStyles = {
  // Layout and container styles
  sidebarContainer: {
    base: "hidden lg:flex flex-col pt-3 fixed top-16 bottom-0 z-30"
  },
  
  sidebarInner: {
    base: "bg-white border-r  border-gray-200 shadow-md h-full flex flex-col"
  },
  
  // User profile section
  userProfileContainer: {
    base: "p-4 border-b pt-20 md:pt-5 lg:pt-5 xl:pt-5 border-gray-100",
    collapsed: "px-3",
    expanded: "px-6"
  },
  
  userInitials: {
    base: "w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white font-bold text-xl"
  },
  
  // Menu items
  menuList: {
    base: "space-y-1 px-2"
  },
  
  menuItem: {
    base: "relative flex items-center gap-3 py-3 rounded-xl font-medium transition-all duration-200",
    active: "text-teal-600 bg-teal-50",
    inactive: "text-gray-600 hover:text-teal-700 hover:bg-gray-50",
    collapsed: "justify-center px-0 mx-2",
    expanded: "px-4"
  },
  
  menuIcon: {
    active: "text-teal-600",
    inactive: "text-gray-500"
  },
  
  activeIndicator: "absolute right-4 w-2 h-2 bg-teal-400 rounded-full animate-ping",
  
  // Toggle button
  toggleButton: {
    base: "absolute -right-3 top-12 z-20 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-teal-600 hover:border-teal-400 hover:bg-teal-50 transition-all"
  },
  
  // Footer section
  footerContainer: {
    base: "border-t border-gray-100 p-4",
    collapsed: "px-3",
    expanded: "px-6"
  },
  
  footerLink: {
    base: "flex items-center gap-3 py-2 rounded-xl font-medium text-gray-600 hover:text-teal-700 hover:bg-gray-50",
    collapsed: "justify-center"
  },
  
  logoutButton: {
    base: "flex items-center gap-3 py-2 rounded-xl font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 w-full mt-1",
    collapsed: "justify-center"
  },
  
  // Mobile sidebar
  mobileOverlay: "fixed inset-0 z-40 lg:hidden",
  mobileBackdrop: "absolute inset-0 bg-black/30 backdrop-blur-sm",
  
  mobileSidebar: {
    base: "absolute left-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl rounded-r-2xl overflow-hidden"
  },
  
  mobileHeader: "p-6 flex justify-between items-center border-b border-gray-100",
  mobileUserContainer: "flex pt-28 items-center gap-3",
  mobileCloseButton: "p-2 rounded-lg hover:bg-gray-100",
  
  mobileMenuList: "space-y-1",
  mobileMenuItem: {
    base: "flex items-center gap-4 px-6 py-4 font-medium",
    active: "text-teal-600 bg-teal-50",
    inactive: "text-gray-600 hover:bg-gray-50"
  },
  
  mobileFooter: "border-t border-gray-100 p-6",
  mobileFooterLink: "flex items-center gap-4 py-2 font-medium text-gray-600 hover:text-teal-700",
  mobileLogoutButton: "flex items-center gap-4 py-2 font-medium text-gray-600 hover:text-red-600 w-full",
  
  // Mobile menu button
  mobileMenuButton: "lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-full flex items-center justify-center shadow-xl"
};

// Helper function to combine class names
export const cn = (...classes) => classes.filter(Boolean).join(" ");



//Styles for Signup component
export const signupStyles = {
  // Page container (reusing from login)
  pageContainer: "min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-emerald-50",
  
  // Card container (reusing from login)
  cardContainer: "w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden",
  
  // Header styles (reusing from login with additions)
  header: "bg-gradient-to-r from-teal-500 to-emerald-600 p-6 text-center relative",
  avatar: "w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4",
  headerTitle: "text-2xl font-bold text-white",
  headerSubtitle: "text-teal-100 mt-2",
  backButton: "absolute top-4 left-4 p-2 text-white rounded-full hover:bg-white/10 transition-colors",
  
  // Form container (reusing from login)
  formContainer: "p-8",
  
  // Error messages
  apiError: "mb-4 text-center text-sm text-red-600",
  fieldError: "mt-1 text-sm text-red-600",
  
  // Form elements (reusing from login with additions)
  label: "block text-sm font-medium text-gray-700 mb-2",
  inputContainer: "relative",
  inputIcon: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400",
  input: "w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-teal-300 focus:border-teal-500",
  passwordInput: "w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-teal-300 focus:border-teal-500",
  passwordToggle: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",
  
  // Checkbox (reusing from login)
  checkboxContainer: "mb-6 flex items-center",
  checkbox: "w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500",
  checkboxLabel: "ml-2 block text-sm text-gray-700",
  
  // Button (reusing from login)
  button: "w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center",
  buttonDisabled: "opacity-80 cursor-not-allowed",
  
  // Sign in link (reusing from login with modifications)
  signInContainer: "mt-8 text-center",
  signInText: "text-gray-600",
  signInLink: "font-medium text-teal-600 hover:underline",
  
  // Spinner for loading state (reusing from login)
  spinner: "animate-spin -ml-1 mr-3 h-5 w-5 text-white"
};


//Styles for Login Component
export const loginStyles = {
  // Page container
  pageContainer: "min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-emerald-50",
  
  // Card container
  cardContainer: "w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden",
  
  // Header styles
  header: "bg-gradient-to-r from-teal-500 to-emerald-600 p-6 text-center",
  avatar: "w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4",
  headerTitle: "text-2xl font-bold text-white",
  headerSubtitle: "text-teal-100 mt-2",
  
  // Form container
  formContainer: "p-8",
  
  // Error message
  errorContainer: "mb-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-center",
  errorIcon: "w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3",
  errorText: "break-words",
  
  // Form elements
  label: "block text-sm font-medium text-gray-700 mb-2",
  inputContainer: "relative",
  inputIcon: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400",
  input: "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-300 focus:border-teal-500",
  passwordInput: "w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-300 focus:border-teal-500",
  passwordToggle: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",
  
  // Checkbox
  checkboxContainer: "mb-6 flex items-center",
  checkbox: "w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500",
  checkboxLabel: "ml-2 block text-sm text-gray-700",
  
  // Button
  button: "w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center",
  buttonDisabled: "opacity-80 cursor-not-allowed",
  
  // Sign up link
  signUpContainer: "mt-8 text-center",
  signUpText: "text-gray-600",
  signUpLink: "font-medium text-teal-600 hover:underline",
  
  // Spinner for loading state
  spinner: "animate-spin -ml-1 mr-3 h-5 w-5 text-white"
};



export const styles = {
  // Layout and Container Styles
  layout: {
    root: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100",
    mainContainer: (sidebarCollapsed) => 
      `p-4 pt-6 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`,
  },

  // Header Styles
  header: {
    container: "flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4",
    title: "text-2xl font-bold text-gray-800",
    subtitle: "text-gray-600",
  },

  // Stat Card Styles
  statCards: {
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-6",
    card: "bg-white p-5 rounded-2xl shadow-sm border border-gray-100",
    cardHeader: "flex justify-between items-start",
    cardTitle: "text-sm text-gray-600",
    cardValue: "text-2xl font-bold text-gray-800 mt-1",
    iconContainer: (color) => `bg-${color}-100 p-2 rounded-lg`,
    icon: (color) => `w-5 h-5 text-${color}-600`,
    cardFooter: "text-xs text-gray-500 mt-3",
  },

  // Grid Layout
  grid: {
    main: "grid grid-cols-1 lg:grid-cols-3 gap-6",
    leftColumn: "lg:col-span-2 space-y-6",
    rightColumn: "lg:col-span-1 lg:-mx-3 space-y-6",
  },

  // Card Styles
  cards: {
    base: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
    header: "flex justify-between items-center mb-6",
    title: "text-xl font-bold text-gray-800 flex items-center gap-3",
    titleIcon: "w-6 h-6",
  },

  // Recent Transactions Card
  transactions: {
    cardHeader: "flex justify-between items-center mb-4",
    cardTitle: "text-md md:text-xl lg:text-xl xl:text-xl font-bold text-gray-800 flex items-center gap-3",
    refreshButton: "p-2 rounded-lg hover:bg-gray-100 transition-colors",
    refreshIcon: (loading) => `w-5 h-5 text-gray-500 ${loading ? 'animate-spin' : ''}`,
    dataStackingInfo: "flex items-center gap-2 text-xs text-gray-500 mb-4 bg-blue-50 p-2 rounded-lg",
    dataStackingIcon: "w-4 h-4 text-blue-500",
    listContainer: "space-y-4 max-h-[500px] -mx-5 overflow-y-auto pr-2",
    transactionItem: "flex items-center lg:flex-col xl:flex-row md:flex-row justify-between p-1 -mx-0 lg:p-4 md:p-4 hover:bg-gray-50 rounded-xl transition-all duration-300 border border-gray-100",
    iconWrapper: (type) => type === 'income' ? 'bg-teal-100 text-teal-600' : 'bg-orange-100 text-orange-600',
    icon: "w-4 h-4",
    details: "min-w-0",
    description: "font-medium text-gray-800 truncate max-w-[120px]",
    meta: "text-xs text-gray-500 mt-1",
    amount: (type) => `font-semibold ${type === 'income' ? 'text-teal-600' : 'text-orange-600'}`,
    emptyState: "text-center py-8",
    emptyIconContainer: "w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center",
    emptyIcon: "w-8 h-8 text-purple-500",
    emptyText: "text-gray-600 font-medium",
    viewAllContainer: "pt-4 border-t border-gray-100",
    viewAllButton: "w-full flex items-center justify-center gap-2 py-3 text-teal-600 font-medium hover:bg-teal-50 rounded-xl transition-colors",
  },

  // Spending by Category Card
  categories: {
    title: "text-lg md:text-xl lg:text-xl xl:text-xl font-bold text-gray-800 mb-6 flex items-center gap-3",
    titleIcon: "w-6 h-6 text-cyan-500",
    list: "space-y-4",
    categoryItem: "flex items-center md:text-lg lg:text-sm xl:text-lg justify-between",
    categoryIconContainer: "bg-gray-100 p-2 rounded-lg",
    categoryIcon: "w-4 h-4 text-gray-600",
    categoryName: "font-medium text-gray-700",
    categoryAmount: "font-semibold text-gray-800",
    summaryContainer: "mt-6 pt-6 border-t border-gray-100",
    summaryGrid: "grid grid-cols-2 gap-4",
    summaryIncomeCard: "bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4",
    summaryExpenseCard: "bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4",
    summaryTitle: "text-sm text-gray-600",
    summaryValue: "text-sm font-bold text-gray-800",
  },

  // Color Helpers
  colors: {
    transaction: {
      text: (type) => type === 'income' ? 'text-teal-600' : 'text-orange-600',
      bg: (type) => type === 'income' ? 'bg-teal-100 text-teal-600' : 'bg-orange-100 text-orange-600',
    },
    expenseChange: (change) => change > 0 ? 'text-orange-600' : 'text-green-600',
  },
};


//Admin Dashboard Styles
export const adminDashboardStyles = {
  // Page
  page: "min-h-screen bg-gray-50 p-6",

  // Header
  header: "mb-8",
  title: "text-3xl font-bold text-gray-900",
  subtitle: "mt-2 text-gray-500",

  // Stats Cards
  cardGrid: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8",

  card: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow",

  cardTop: "flex items-center justify-between mb-4",

  cardTitle: "text-gray-500 text-sm font-medium",

  cardValue: "mt-2 text-3xl font-bold text-gray-900",

  // Bottom Section
  bottomGrid: "grid grid-cols-1 xl:grid-cols-2 gap-6",

  sectionCard:
    "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[380px]",

  sectionTitle:
    "text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2",

  placeholder:
    "flex items-center justify-center h-[280px] rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm",
};


//Admin Product Styles
export const productStyles = {

  page: "min-h-screen bg-gray-50 p-6",

  header: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8",

  title: "text-3xl font-bold text-gray-900",

  subtitle: "text-gray-500 mt-2",

  addButton:
    "flex items-center gap-2 bg-lime-300 hover:bg-lime-400 px-5 py-3 rounded-xl font-semibold transition",

  topBar:
    "flex flex-col md:flex-row gap-4 justify-between items-center mb-8",

  searchContainer:
    "relative flex-1 w-full",

  searchIcon:
    "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5",

  searchInput:
    "w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime-300",

  select:
    "w-full md:w-60 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime-300",

  grid:
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",

  input:
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-300",

  textarea:
    "w-full px-4 py-3 rounded-xl border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-lime-300",

};