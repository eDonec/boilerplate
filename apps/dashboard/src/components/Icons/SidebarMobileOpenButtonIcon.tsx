const SidebarMobileOpenButtonIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-adjustments"
    width={20}
    height={20}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#FFFFFF"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <CircleAndLine startPoint={isOpen ? 18 : 6} offset={0} />
    <CircleAndLine startPoint={isOpen ? 6 : 17} offset={1} />
    <CircleAndLine startPoint={isOpen ? 15 : 10} offset={2} />
  </svg>
);

export default SidebarMobileOpenButtonIcon;

interface IProps {
  startPoint: number;
  offset: number;
}
const CircleAndLine = ({ startPoint, offset }: IProps) => (
  <>
    <circle
      style={{
        // @ts-expect-error this property is not defined in the SVG typing, it works nonetheless
        cy: startPoint,
      }}
      className="transition-[cy]"
      cx={(offset + 1) * 6}
      cy={startPoint}
      r={2}
    />
    <line
      x1={(offset + 1) * 6}
      y1={4}
      y2={startPoint - 2}
      x2={(offset + 1) * 6}
    />
    <line
      x1={(offset + 1) * 6}
      x2={(offset + 1) * 6}
      y2={20}
      y1={startPoint + 2}
    />
  </>
);
