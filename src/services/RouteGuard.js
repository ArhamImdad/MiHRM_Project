import store from "../store/index"; // Import the Vuex store

let RouteService = function routeGuard(permission, to) {
  const isAuthenticated = store.state.auth.user; // Check if user is logged in
  const userPermissions = store.state.role.permissions; // Get user permissions from Vuex store
  
  if (isAuthenticated) {
    if (userPermissions.includes(permission)) {
      // If the user has the required permission, allow access
      return true;
    } else {
      // If the user does not have the required permission, redirect to an unauthorized page or block access
      return "/unauthorized"; // Customize this based on your app (e.g., a 403 page)
    }
  } else {
    // If not authenticated, redirect to sign-in page
    return "/signin";
  }
};

export default RouteService;
