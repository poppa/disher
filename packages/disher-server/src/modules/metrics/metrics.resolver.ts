import { Resolver, Query, Authorized } from 'type-graphql'
import { appInfo, AppInfo } from '../../lib/app-info'
import { logger } from '../../utils/log'

const { error } = logger()

@Resolver()
export class MetricsResolver {
  @Authorized('admin')
  @Query(() => AppInfo)
  public async appInfo(): Promise<AppInfo> {
    try {
      return appInfo()
    } catch (e) {
      error({ err: e }, 'resolver appInfo()')
      throw e
    }
  }
}
