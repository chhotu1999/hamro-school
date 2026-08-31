import { AppLayoutModule } from '../layout/app-layout/app-layout.module';
import { CardModule } from './controls/card/card.module';
import { IconModule } from './controls/icon/icon.module';
import { MatGridModule } from './controls/mat-grid/mat-grid.module';

/**
 * NgModule bundle for the building blocks nearly every feature page uses.
 * Spread into a standalone component's `imports` array instead of listing
 * each module individually: `imports: [...SharedControls, ...pageSpecificOnes]`.
 * A standalone component's `imports` accepts NgModules directly, so this
 * spread pattern works the same as it did with standalone components.
 */
export const SharedControls = [AppLayoutModule, CardModule, IconModule, MatGridModule] as const;
