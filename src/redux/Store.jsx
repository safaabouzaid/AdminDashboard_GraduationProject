import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import themeReducer from "./thems/themeSlice";
import companyReducer from "./CompanySlice";
import adsReducer from "./AdsSlice"
import searchReducer from './SearchSlice';
import dashboardStatsReducer from './dashboardStatsSlice'
import complaintReducer from "./complaintSlice";
import planReducer from './planSlice';
import AllplanReducer from './AllplansSlice';
import subscriptionRequestsReducer from './subscriptionRequestsSlice'


export const store = configureStore({
  reducer: {
     user: userReducer,
     theme:themeReducer ,
     company: companyReducer,
     ads: adsReducer,
     search: searchReducer,
     dashboardStats: dashboardStatsReducer,
     complaint: complaintReducer,
     plans: planReducer,
     allplans:AllplanReducer,
     subscriptionRequests:subscriptionRequestsReducer,

  },
});
