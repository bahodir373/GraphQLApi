import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';

@Resolver(() => Purchase)
export class PurchaseResolver {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Query(() => [Purchase], { name: 'getAllPurchases' })
  findAll() {
    return this.purchaseService.findAll();
  }

  @Query(() => Purchase, { name: 'getPurchase' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.purchaseService.findOne(id);
  }

  @Mutation(() => Purchase)
  createPurchase(
    @Args('itemName') itemName: string,
    @Args('price', { type: () => Int }) price: number,
    @Args('quantity', { type: () => Int }) quantity: number,
  ) {
    return this.purchaseService.create({ id: 0, itemName, price, quantity, totalAmount: 0 });
  }

  @Mutation(() => Purchase)
  updatePurchase(
    @Args('id', { type: () => Int }) id: number,
    @Args('itemName') itemName: string,
    @Args('price', { type: () => Int }) price: number,
    @Args('quantity', { type: () => Int }) quantity: number,
  ) {
    return this.purchaseService.update(id, { id, itemName, price, quantity, totalAmount: 0 });
  }

  @Mutation(() => Boolean)
  deletePurchase(@Args('id', { type: () => Int }) id: number) {
    return this.purchaseService.delete(id);
  }
}
