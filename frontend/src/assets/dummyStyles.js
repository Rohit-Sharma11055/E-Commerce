// Styles for Navbar component
export const navbarStyles = {
  // Navbar container style
  header: "sticky top-0 z-50 bg-cyan-100 border-b border-gray-100 shadow-sm",
  container: "flex items-center justify-between px-4 py-3 md:px-8 max-w-7xl mx-auto",
  
  // Logo styles
  logoContainer: "flex items-center gap-2 cursor-pointer",
  logoImage: "w-12 h-12 rounded-xl overflow-hidden",
  logoText: "lg:text-2xl md:text-2xl text-1xl text-gray-900 font-[550] lobster-regular",

  // Navlinks styles
    navlinkContainer: "hidden lg:flex items-center gap-5",

    navLink: "flex items-center gap-1 text-gray-500 font-semibold tracking-wide text-sm hover:text-black transition-colors duration-200",

    activeNavLink: "flex items-center gap-1 bg-lime-300 text-black px-5 py-2 rounded-full font-bold tracking-wider text-sm hover:bg-lime-400 transition-all duration-200",

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