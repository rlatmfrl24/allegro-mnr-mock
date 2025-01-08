interface DamageRequestProps extends DamageSummaryProps {
  containerNumber: string;
  vendorShop: string;
}

interface DamageSummaryProps {
  estimatedPeriod: string;
  location: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
  images: DamageRequestImageProps[];
}

interface DamageRequestImageProps {
  encodedImage: string;
  createdAt: Date;
  src?: string;
}

export type { DamageRequestProps, DamageRequestImageProps, DamageSummaryProps };
