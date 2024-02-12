// Observable 기초

import { GenerateObservables } from './_components/generate-observables';

export default function page() {
  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-center">
      {/* Observable 스트림 생성기 */}
      <GenerateObservables />
    </div>
  );
}
