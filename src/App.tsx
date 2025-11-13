import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FlowProvider } from "./contexts/FlowContext";
import ErrorBoundary from "./components/ErrorBoundary";
import StartScreen from "./components/StartScreen";
import LanguageSelector from "./components/LanguageSelector";
import NameInput from "./components/NameInput";
import Page3 from "./components/Page3";
import Page48 from "./components/Page48";
import PhoneInput from "./components/PhoneInput";
import AddressInput from "./components/AddressInput";
import MBTICheck from "./components/MBTICheck";
import MBTIInput from "./components/MBTIInput";
import MBTITest from "./components/MBTITest";
import Page9 from "./components/Page9";
import Page10 from "./components/Page10";
import Page11 from "./components/Page11";
import Page12 from "./components/Page12";
import Page13 from "./components/Page13";
import Page14 from "./components/Page14";
import Page15 from "./components/Page15";
import Page16 from "./components/Page16";
import Page17 from "./components/Page17";
import Page18 from "./components/Page18";
import Page19 from "./components/Page19";
import Page20 from "./components/Page20";
import PersonalityResult from "./components/PersonalityResult";
import ClaimOrder from "./components/ClaimOrder";
import DesignShirt from "./components/DesignShirt";
import Payment from "./components/Payment";
import Calendar from "./components/Calendar";
import ThankYou from "./components/ThankYou";
import GetOtherPatch from "./components/GetOtherPatch";
import GetOtherPatch2 from "./components/GetOtherPatch2";
import GetOtherPatch3 from "./components/GetOtherPatch3";
import GetOtherPatch4 from "./components/GetOtherPatch4";
import GetOtherPatch5 from "./components/GetOtherPatch5";
import GetOtherPatch6 from "./components/GetOtherPatch6";
import GetOtherPatch7 from "./components/GetOtherPatch7";
import GetOtherPatch8 from "./components/GetOtherPatch8";
import GetOtherPatch9 from "./components/GetOtherPatch9";
import GetOtherPatch10 from "./components/GetOtherPatch10";
import GetOtherPatch11 from "./components/GetOtherPatch11";
import GetOtherPatch12 from "./components/GetOtherPatch12";
import GetOtherPatch13 from "./components/GetOtherPatch13";
import GetOtherPatch14 from "./components/GetOtherPatch14";
import GetOtherPatch15 from "./components/GetOtherPatch15";
import GetOtherPatch16 from "./components/GetOtherPatch16";
import GetOtherPatch17 from "./components/GetOtherPatch17";
import GetOtherPatch18 from "./components/GetOtherPatch18";
import GetOtherPatch19 from "./components/GetOtherPatch19";
import GetOtherPatch20 from "./components/GetOtherPatch20";
import ChooseOtherPatch from "./components/ChooseOtherPatch";
import MBTIScoringResult from "./components/MBTIScoringResult";
import PersonalizedPatch from "./components/PersonalizedPatch";
import ChooseOwnPatch from "./components/ChooseOwnPatch";
import ComingSoon from "./components/ComingSoon";
import SelectItem from "./components/SelectItem";
import SelectCapColor from "./components/SelectCapColor";
import SelectShirtColor from "./components/SelectShirtColor";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <FlowProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<StartScreen />} />
              <Route path="/language-selector" element={<LanguageSelector />} />
              <Route path="/name" element={<NameInput />} />
              <Route path="/3.jpg" element={<Page3 />} />
              <Route path="/48.jpg" element={<Page48 />} />
              <Route path="/phone" element={<PhoneInput />} />
              <Route path="/address" element={<AddressInput />} />
              <Route path="/mbti-check" element={<MBTICheck />} />
              <Route path="/mbti-input" element={<MBTIInput />} />
              <Route path="/mbti-test" element={<MBTITest />} />
              <Route path="/page9" element={<Page9 />} />
              <Route path="/page10" element={<Page10 />} />
              <Route path="/page11" element={<Page11 />} />
              <Route path="/page12" element={<Page12 />} />
              <Route path="/page13" element={<Page13 />} />
              <Route path="/page14" element={<Page14 />} />
              <Route path="/page15" element={<Page15 />} />
              <Route path="/page16" element={<Page16 />} />
              <Route path="/page17" element={<Page17 />} />
              <Route path="/page18" element={<Page18 />} />
              <Route path="/page19" element={<Page19 />} />
              <Route path="/page20" element={<Page20 />} />
              <Route
                path="/personality-result"
                element={<PersonalityResult />}
              />
              <Route path="/claim-order" element={<ClaimOrder />} />
              <Route path="/design-shirt" element={<DesignShirt />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/get-other-patch" element={<GetOtherPatch />} />
              <Route path="/get-other-patch-2" element={<GetOtherPatch2 />} />
              <Route path="/get-other-patch-3" element={<GetOtherPatch3 />} />
              <Route path="/get-other-patch-4" element={<GetOtherPatch4 />} />
              <Route path="/get-other-patch-5" element={<GetOtherPatch5 />} />
              <Route path="/get-other-patch-6" element={<GetOtherPatch6 />} />
              <Route path="/get-other-patch-7" element={<GetOtherPatch7 />} />
              <Route path="/get-other-patch-8" element={<GetOtherPatch8 />} />
              <Route path="/get-other-patch-9" element={<GetOtherPatch9 />} />
              <Route path="/get-other-patch-10" element={<GetOtherPatch10 />} />
              <Route path="/get-other-patch-11" element={<GetOtherPatch11 />} />
              <Route path="/get-other-patch-12" element={<GetOtherPatch12 />} />
              <Route path="/get-other-patch-13" element={<GetOtherPatch13 />} />
              <Route path="/get-other-patch-14" element={<GetOtherPatch14 />} />
              <Route path="/get-other-patch-15" element={<GetOtherPatch15 />} />
              <Route path="/get-other-patch-16" element={<GetOtherPatch16 />} />
              <Route path="/get-other-patch-17" element={<GetOtherPatch17 />} />
              <Route path="/get-other-patch-18" element={<GetOtherPatch18 />} />
              <Route path="/get-other-patch-19" element={<GetOtherPatch19 />} />
              <Route path="/get-other-patch-20" element={<GetOtherPatch20 />} />
              <Route
                path="/choose-other-patch"
                element={<ChooseOtherPatch />}
              />
              <Route
                path="/mbti-scoring-result"
                element={
                  <MBTIScoringResult
                    result={{
                      type: "ENFP",
                      scores: {
                        E: 3,
                        I: 2,
                        S: 1,
                        N: 4,
                        T: 2,
                        F: 3,
                        J: 1,
                        P: 4,
                      },
                    }}
                  />
                }
              />
              <Route
                path="/personalized-patch"
                element={<PersonalizedPatch />}
              />
              <Route path="/choose-own-patch" element={<ChooseOwnPatch />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/select-item" element={<SelectItem />} />
              <Route path="/select-cap-color" element={<SelectCapColor />} />
              <Route
                path="/select-shirt-color"
                element={<SelectShirtColor />}
              />
            </Routes>
          </div>
        </Router>
      </FlowProvider>
    </ErrorBoundary>
  );
}

export default App;
