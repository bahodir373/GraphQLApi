import { Injectable } from '@nestjs/common';
import { Formalize } from './formalize.entity';

@Injectable()
export class FormalizeService {
  private formalizes: Formalize[] = [];

  findAll(): Formalize[] {
    return this.formalizes;
  }

  findOne(id: number): Formalize {
    return this.formalizes.find((formalize) => formalize.id === id);
  }

  create(formalize: Formalize): Formalize {
    formalize.id = this.formalizes.length + 1;
    this.formalizes.push(formalize);
    return formalize;
  }

  update(id: number, updatedFormalize: Formalize): Formalize {
    const index = this.formalizes.findIndex((formalize) => formalize.id === id);
    if (index !== -1) {
      this.formalizes[index] = { ...this.formalizes[index], ...updatedFormalize };
      return this.formalizes[index];
    }
    return null;
  }

  delete(id: number): boolean {
    const index = this.formalizes.findIndex((formalize) => formalize.id === id);
    if (index !== -1) {
      this.formalizes.splice(index, 1);
      return true;
    }
    return false;
  }
}