import { BladeSitePage } from './app.po';

describe('blade-site App', () => {
  let page: BladeSitePage;

  beforeEach(() => {
    page = new BladeSitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
