import {sortAscending, sortDescending} from '../components/lib/sorting.js';


describe('Sorting Functions', () => {
  
  const dummyData = [
    {upload: '2018-10-17 20:05:39'},
    {upload: '2017-10-17 10:05:39'},
    {upload: '2018-10-17 20:05:38'}
  ];

  const date1 = {upload: '2018-10-17 20:05:39'};
  const date2 = {upload: '2017-10-17 10:05:39'};

  test('should compare ascending dates', () => {
    expect(sortAscending(date1, date2)).toBe(1);
    expect(sortAscending(date2, date1)).toBe(-1);
  });

  test('should sort array ascending dates', () => {
    let copy = [...dummyData];
    let result = copy.sort(sortAscending);
    expect(result[0].upload).toBe(dummyData[1].upload);
    expect(result[1].upload).toBe(dummyData[2].upload);
    expect(result[2].upload).toBe(dummyData[0].upload);
  });

  test('should compare descending dates', () => {
    expect(sortDescending(date1, date2)).toBe(-1);
    expect(sortDescending(date2, date1)).toBe(1);
  });

  test('should sort array descending dates', () => {
    let copy = [...dummyData];
    let result = copy.sort(sortDescending);
    expect(result[0].upload).toBe(dummyData[0].upload);
    expect(result[1].upload).toBe(dummyData[2].upload);
    expect(result[2].upload).toBe(dummyData[1].upload);
  });
});