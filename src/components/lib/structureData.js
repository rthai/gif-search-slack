const structureData = (data) => {
  return data.map(gif => {
    let copy = {};
    copy.src = gif.images.original.url;
    // copy.thumbnail = gif.images.fixed_width.url;
    copy.thumbnail = gif.images.preview_gif.url;
    // copy.data_src = gif.images.fixed_width.url;
    // copy.thumbnail = '';
    copy.thumbnailWidth = parseInt(gif.images.preview_gif.width);
    copy.thumbnailHeight = parseInt(gif.images.preview_gif.height);
    copy.caption = gif.title;
    copy.id = gif.id;
    copy.user = gif.user;
    copy.upload = gif.import_datetime;
    return copy;
  });
}

export default structureData;
