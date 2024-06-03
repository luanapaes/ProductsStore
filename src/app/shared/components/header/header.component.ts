import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() firstListItem: string = "";
  @Input() secondListItem: string = "";
  @Input() thirdListItem: string = ""
}
