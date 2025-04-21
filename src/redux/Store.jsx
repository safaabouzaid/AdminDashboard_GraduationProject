import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import themeReducer from "./thems/themeSlice";
import companyReducer from "./CompanySlice";
import adsReducer from "./AdsSlice"
import searchReducer from './SearchSlice';
import dashboardStatsReducer from './dashboardStatsSlice'
export const store = configureStore({
  reducer: {
     user: userReducer,
     theme:themeReducer ,
     company: companyReducer,
     ads: adsReducer,
     search: searchReducer,
     dashboardStats: dashboardStatsReducer

  },
});
