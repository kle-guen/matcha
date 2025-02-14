import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';

// if (window) { //TODO: decommenter pour enlever tous les logs
// 	window.console.log =
// 		window.console.warn =
// 			window.console.info =
// 				window.console.error =
// 					function () {
// 						// no logs in production
// 					};
// }
bootstrapApplication(AppComponent, appConfig)
	.catch((err) => console.error(err));
