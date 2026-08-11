export type PageToken = number | 'ellipsis';

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function buildPageList(current: number, total: number, siblingCount = 1): PageToken[] {
  if (total <= 0) return [];

  const totalPageNumbers = siblingCount * 2 + 5;
  if (total <= totalPageNumbers) {
    return range(1, total);
  }

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, siblingCount * 2 + 3), 'ellipsis', total];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, 'ellipsis', ...range(total - (siblingCount * 2 + 2), total)];
  }

  return [1, 'ellipsis', ...range(leftSibling, rightSibling), 'ellipsis', total];
}
