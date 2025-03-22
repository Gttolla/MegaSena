import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})

export class FormComponent {
  goldenNumbers: string = '';
  numbers: number[] = [];
  success: boolean = false;
  buttons: number[] = Array.from({ length: 60 }, (_, i) => i + 1);
  selectedNumbers: number[] = [];
  winningNumbers: number[] = [];

  constructor(private modalService: NgbModal) {}

  onClickAddGoldenNumber(content: any) {
    if (this.goldenNumbers) {
      this.goldenNumbers.split(',').forEach((number) => {
        this.numbers.push(+number);
      });

      const uniqueNumbers = [...new Set(this.numbers)];
      this.numbers = uniqueNumbers.sort((a, b) => a - b);

      const validNumbers = this.numbers.filter((number) => number >= 1 && number <= 60);
      this.numbers = validNumbers;

      if (this.numbers.length < 6 || this.numbers.length > 6) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
        this.goldenNumbers = '';
        this.numbers = [];
        return
      }

      this.success = true;
    }
  }

  onClickClear() {
    this.goldenNumbers = '';
    this.numbers = [];
    this.success = false;
    this.selectedNumbers = [];
  }

  onClickAddNumber(number: number) {
    if (this.selectedNumbers.length < 10 && !this.selectedNumbers.includes(number)) {
      this.selectedNumbers.push(number);
    }
  }

  onClickRemoveNumber(number: number) {
    const index = this.selectedNumbers.indexOf(number);
    this.selectedNumbers.splice(index, 1);
  }

  onClickCompleteNumbers() {
    if (this.selectedNumbers.length < 10) {
      const numbers = this.selectedNumbers.length;
      const remainingNumbers = 10 - numbers;

      for (let i = 0; i < remainingNumbers; i++) {
        let random = Math.floor(Math.random() * 60) + 1;

        while (this.selectedNumbers.includes(random)) {
          random = Math.floor(Math.random() * 60) + 1;
        }

        this.selectedNumbers.push(random);
      }
    }
  }

  onClickClearSelectedNumbers() {
    this.selectedNumbers = [];
  }
  
  onClickBet(content: any) {
    this.winningNumbers = [];

    this.selectedNumbers.forEach((number) => {
      if (this.numbers.includes(number)) {
        this.winningNumbers.push(number);
        console.log(this.winningNumbers);
      }
    });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
