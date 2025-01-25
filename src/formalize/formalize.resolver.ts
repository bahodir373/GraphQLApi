import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FormalizeService } from './formalize.service';
import { Formalize } from './formalize.entity';

@Resolver(() => Formalize)
export class FormalizeResolver {
  constructor(private readonly formalizeService: FormalizeService) {}

  @Query(() => [Formalize], { name: 'getAllFormalizes' })
  findAll() {
    return this.formalizeService.findAll();
  }

  @Query(() => Formalize, { name: 'getFormalize' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.formalizeService.findOne(id);
  }

  @Mutation(() => Formalize)
  createFormalize(
    @Args('type') type: string,
    @Args('details') details: string,
    @Args('status') status: string,
  ) {
    return this.formalizeService.create({ id: 0, type, details, status });
  }

  @Mutation(() => Formalize)
  updateFormalize(
    @Args('id', { type: () => Int }) id: number,
    @Args('type') type: string,
    @Args('details') details: string,
    @Args('status') status: string,
  ) {
    return this.formalizeService.update(id, { id, type, details, status });
  }

  @Mutation(() => Boolean)
  deleteFormalize(@Args('id', { type: () => Int }) id: number) {
    return this.formalizeService.delete(id);
  }
}
