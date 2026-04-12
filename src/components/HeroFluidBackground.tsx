import { useThree } from '@react-three/fiber';
import { Image } from '@react-three/drei';

export function HeroFluidBackground({ url = '/hero-portrait.jpg' }) {
  const { viewport } = useThree();
  const scaleX = viewport.width;
  const scaleY = viewport.height;

  // Let's make it cover the viewport, maybe scaling up slightly for parallax or safe cover
  return (
    <Image
      url={url}
      scale={[scaleX * 1.05, scaleY * 1.05]}
      position={[0, 0, -2]}
    />
  );
}
