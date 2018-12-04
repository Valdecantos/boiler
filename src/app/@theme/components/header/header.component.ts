import { Component, Input, OnInit } from '@angular/core';
import { NbSidebarService, NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from '../dialog-name-prompt/dialog-name-prompt.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';


  constructor(private sidebarService: NbSidebarService, private dialogService: NbDialogService) {
  }

  ngOnInit() {
  }


  modalSettings(): boolean {
    this.dialogService.open(DialogNamePromptComponent)
      .onClose.subscribe(name => name && console.log(name));

    return false;
  }

}
