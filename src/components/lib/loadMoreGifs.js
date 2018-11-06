const loadMoreGifs = (e, offset, fetchFn) => {    
  let scrollPosition = window.scrollY + window.innerHeight;
  let end = e.target.documentElement.offsetHeight;

  if (scrollPosition === end) {
    console.log('end')
    fetchFn(offset);
  }
}

export default loadMoreGifs;
