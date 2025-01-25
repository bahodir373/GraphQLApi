import { Injectable } from '@nestjs/common';
import { Purchase } from './purchase.entity';

@Injectable()
export class PurchaseService {
  private purchases: Purchase[] = [];

  findAll(): Purchase[] {
    return this.purchases;
  }

  findOne(id: number): Purchase {
    return this.purchases.find((purchase) => purchase.id === id);
  }

  create(purchase: Purchase): Purchase {
    purchase.id = this.purchases.length + 1;
    purchase.totalAmount = purchase.price * purchase.quantity;
    this.purchases.push(purchase);
    return purchase;
  }

  update(id: number, updatedPurchase: Purchase): Purchase {
    const index = this.purchases.findIndex((purchase) => purchase.id === id);
    if (index !== -1) {
      updatedPurchase.totalAmount = updatedPurchase.price * updatedPurchase.quantity;
      this.purchases[index] = { ...this.purchases[index], ...updatedPurchase };
      return this.purchases[index];
    }
    return null;
  }

  delete(id: number): boolean {
    const index = this.purchases.findIndex((purchase) => purchase.id === id);
    if (index !== -1) {
      this.purchases.splice(index, 1);
      return true;
    }
    return false;
  }
}