import { AuthenticationPage } from './authentication/authentication';
import { StatistiquePage } from './statistique/statistique';
import { CanvasPage } from './canvas/canvas';
// import home in case of server auth problem
import { HomePage } from './home/home';


// The page the user lands on after opening the app and without a session
export const FirstRunPage = AuthenticationPage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = StatistiquePage;
export const Tab2Root = CanvasPage;
