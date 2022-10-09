import { getStringForImg } from './helpers';

describe('Fn getStringForImg', () => {

  it('Корректно возвращает значение', () => {
    const testTitle = 'Fantastic Beasts The Crimes of Grindelwald';
    const testToBe = 'fantastic-beasts-the-crimes-of-grindelwald';
    expect(getStringForImg(testTitle)).toBe(testToBe);
  });

});
