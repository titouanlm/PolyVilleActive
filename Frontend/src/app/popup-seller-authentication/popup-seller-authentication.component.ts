import {Component,OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SellerService} from "../../services/seller.service";

@Component({
  selector: 'app-popup-seller-authentication',
  templateUrl: './popup-seller-authentication.component.html',
  styleUrls: ['./popup-seller-authentication.component.scss']
})

export class PopupSellerAuthenticationComponent implements OnInit {

  number: number;

  error = '';

  constructor(private dialogRef: MatDialogRef<PopupSellerAuthenticationComponent>,
              private router: Router, private sellerService: SellerService) { }

  ngOnInit(): void {
  }

  /**
   * This method authenticate a seller in the system
   */

  authenticate(){
    this.sellerService.authenticateSeller(Number(this.number))
      .subscribe(
        data => {
          this.dialogRef.close();
          this.router.navigate(['seller']);
        },
        error => {
          this.error = 'Unknown seller.';
          console.log(this.error);
        });
  }

}
