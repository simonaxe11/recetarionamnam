import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import AnadirrecetaPage from '..//anadirreceta/anadirreceta';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AnadirrecetaPage;

  constructor() {

  }
}
