const formatMixedNumber = (num) => {
  const { whole, numer, denom } = simplifyMixedNumber(num);
  if (whole === 0 && numer === 0) return <>0</>;
  return (
    <>
      {whole !== 0 && whole}{' '}
      {numer !== 0 && (
        <>
          <sup>{numer}</sup>&frasl;
        </>
      )}
      <sub>{denom !== 1 && `${denom}`}</sub>
    </>
  );
};

const getGcd = (a, b) => {
  if (a == 0) return b;
  return getGcd(b % a, a);
};

const reduce = (numerator, denominator) => {
  if (isNaN(numerator) || isNaN(denominator)) return NaN;
  const gcd = getGcd(numerator, denominator);
  return [numerator / gcd, denominator / gcd];
};

const simplifyMixedNumber = ({ whole, numer, denom }) => {
  const num = parseInt(numer / denom);
  whole = whole * 1 + num;
  numer -= num * denom;
  [numer, denom] = reduce(numer, denom);
  return { whole, numer, denom };
};

const addMixedNumber = (
  { whole: whole1, numer: numer1, denom: denom1 },
  { whole: whole2, numer: numer2, denom: denom2 }
) => {
  // convert to fraction
  numer1 = whole1 * denom1 + numer1;
  numer2 = whole2 * denom2 + numer2;
  // add 2 faction
  let denom3 = getGcd(denom1, denom2);
  denom3 = (denom1 * denom2) / denom3;
  let numer3 = numer1 * (denom3 / denom1) + numer2 * (denom3 / denom2);
  return simplifyMixedNumber({ whole: 0, numer: numer3, denom: denom3 });
};

export { formatMixedNumber, addMixedNumber, simplifyMixedNumber };
