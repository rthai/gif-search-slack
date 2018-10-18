import structureData from '../components/lib/structureData';

describe('Restructure Response Data', () => {
  const dummyData = [
    {
      images: {
        original: {
          url: 'https://www.originalurl.com',
        },
        preview_gif: {
          url: 'https://www.previewgifurl.com',
          width: '200',
          height: '300',
        },
      },
      title: 'test gift title',
      id: '1',
      user: {/** user infor **/},
      import_datetime: '2018-10-17 20:05:39',
    }
  ];

  const restructured = structureData(dummyData);
  const gif = restructured[0];
  const dummyGif = dummyData[0];

  test('should restructure response data', () => {
    expect(Array.isArray(restructured)).toBe(true);
    expect(gif.src).toBe(dummyGif.images.original.url);
    expect(gif.thumbnail).toBe(dummyGif.images.preview_gif.url);
    expect(gif.thumbnailWidth).toBe(parseInt(dummyGif.images.preview_gif.width));
    expect(gif.thumbnailHeight).toBe(parseInt(dummyGif.images.preview_gif.height));
    expect(gif.caption).toBe(dummyGif.title);
    expect(gif.id).toBe(dummyGif.id);
    expect(gif.user).toBe(dummyGif.user);
    expect(gif.upload).toBe(dummyGif.import_datetime);
  });

});
