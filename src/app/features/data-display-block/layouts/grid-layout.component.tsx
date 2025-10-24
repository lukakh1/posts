import { LayoutProps } from "../data-display-block.types";

export function GridLayout<T>({
  data,
  renderItem,
  className,
  testId,
}: LayoutProps<T>) {
  return (
    <div data-testid={testId} className={className}>
      {data.map((item, index) => (
        <div key={index}>{renderItem(item, index)}</div>
      ))}
    </div>
  );
}
