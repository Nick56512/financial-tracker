import { Inject } from '@nestjs/common';
import { IVerificationManager } from './iverification.manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

export class VerificationManager implements IVerificationManager {
  private readonly codeTtlMilliseconds: number = 10 * 10000;

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async createCode(cacheStoreKey: string): Promise<number> {
    const code = Math.floor(100000 + Math.random() * 900000);
    await this.cacheManager.set<number>(
      cacheStoreKey,
      code,
      this.codeTtlMilliseconds,
    );
    return code;
  }

  async isExistsCode(cacheStoreKey: string): Promise<boolean> {
    const code = await this.cacheManager.get<number>(cacheStoreKey);
    return !!code;
  }

  async verificate(cacheStoreKey: string, inputCode: number): Promise<boolean> {
    const code = await this.cacheManager.get<number>(cacheStoreKey);
    if (!code) {
      return false;
    }
    if (inputCode !== code) {
      return false;
    }
    await this.cacheManager.del(cacheStoreKey);
    return true;
  }
}
