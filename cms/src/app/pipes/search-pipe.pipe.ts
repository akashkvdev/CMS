import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}



@Pipe({
  name: 'solvedComplaint'
})
export class SolvedComplaintsPipe implements PipeTransform {

  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const category_name = item.category.category_name.toLowerCase();
      const dept_name = item.dept_name.toLowerCase();
      const complaints_ref_no = item.complaints_ref_no.toLowerCase();

      return (
        category_name.includes(searchValue) ||
        dept_name.includes(searchValue) ||
        complaints_ref_no.includes(searchValue)
      );
    });
  }
  }

@Pipe({
  name: 'pendingComplaint'
})
export class PendingComplaintsPipe implements PipeTransform {

  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const category_name = item.category.category_name.toLowerCase();
      const dept_name = item.dept_name.toLowerCase();
      const complaints_ref_no = item.complaints_ref_no.toLowerCase();

      return (
        category_name.includes(searchValue) ||
        dept_name.includes(searchValue) ||
        complaints_ref_no.includes(searchValue)
      );
    });
  }
  }
@Pipe({
  name: 'notProcessedComplaint'
})
export class NotProccessedComplaintsPipe implements PipeTransform {

  transform(value: any, args?: string): any {
    if (!args) {
      return value;
    }

    const searchValue = args.toLowerCase();

    return value.filter((item: any) => {
      const category_name = item.category_name.toLowerCase();
      const dept_name = item.dept_name.toLowerCase();
      const complaints_ref_no = item.complaints_ref_no.toLowerCase();

      return (
        category_name.includes(searchValue) ||
        dept_name.includes(searchValue) ||
        complaints_ref_no.includes(searchValue)
      );
    });
  }}


  @Pipe({
    name: 'ProcessedComplaint'
  })
  export class ProccessedComplaintsPipe implements PipeTransform {
  
    transform(value: any, args?: string): any {
      if (!args) {
        return value;
      }
  
      const searchValue = args.toLowerCase();
  
      return value.filter((item: any) => {
        const category_name = item.category_name.toLowerCase();
        const dept_name = item.dept_name.toLowerCase();
        const complaints_ref_no = item.complaints_ref_no.toLowerCase();
  
        return (
          category_name.includes(searchValue) ||
          dept_name.includes(searchValue) ||
          complaints_ref_no.includes(searchValue)
        );
      });
    }
  }
  

 

