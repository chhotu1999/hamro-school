import { AppLayout } from '../layout/app-layout/app-layout';
import { DataGridCellTemplate } from './ui/data-grid/cell-template.directive';
import { DataGrid } from './ui/data-grid/data-grid';
import { Card } from './ui/card/card';
import { Icon } from './ui/icon/icon';

/**
 * Standalone-component bundle for the building blocks nearly every feature
 * page uses. Spread into a component's `imports` array instead of listing
 * each one individually: `imports: [...SharedComponent, ...pageSpecificOnes]`.
 * This file is the place to grow that shared surface later on — snackbars,
 * shared services, etc.
 */
export const SharedComponent = [AppLayout, Card, Icon, DataGrid, DataGridCellTemplate] as const;
