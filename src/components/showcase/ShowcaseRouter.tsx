import { BrowserRouter, Route, Routes } from "react-router";
import { ShowcaseOverview } from "./ShowcaseOverview";
import { ShowcaseSeason } from "./ShowcaseSeason";

export const ShowcaseRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/showcase" element={<ShowcaseOverview />} />
        <Route path="/showcase/*" element={<ShowcaseSeason />} />
      </Routes>
    </BrowserRouter>
  );
};