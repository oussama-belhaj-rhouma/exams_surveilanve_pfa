import { Component, Input } from '@angular/core';
import { Section } from 'src/app/models/Section';

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.css'],
})
export class HistoryCardComponent {
  @Input() number!: string;
  @Input() date!: string;
  @Input() imageUrl: string = "";
  @Input() section: string = "";

}
