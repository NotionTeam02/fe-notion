import styled from 'styled-components';
import themes from '../../styles/themes';

const { BackgroudColor: defaultBackGroundColor, WeakColor } = themes.Color;

interface CustomPopupImageProps {
  className?: string;
  BackgroudColor?: string;
  width?: number;
  height?: number;
  src: string;
}
interface StyledImgProps {
  widthProp: number;
  heightProp: number;
  BackgroudColor: string;
}

export default function CustomPopupImage({
  className,
  BackgroudColor = defaultBackGroundColor,
  width = 23,
  height = 23,
  src = '',
}: CustomPopupImageProps) {
  return (
    <StyledImg className={className} BackgroudColor={BackgroudColor} widthProp={width} heightProp={height} src={src} />
  );
}

const StyledImg = styled.img<StyledImgProps>`
  display: block;
  object-fit: cover;
  border-radius: 4px;
  background: ${({ BackgroudColor }) => BackgroudColor};
  width: ${({ widthProp }) => widthProp}px;
  height: ${({ heightProp }) => heightProp}px;
  border: 1px solid ${WeakColor};
`;
