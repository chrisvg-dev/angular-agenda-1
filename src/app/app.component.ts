import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'Agenda';
  public tasks: any = [];

  public activity: string = "";
  public date: string = "";
  public time: string = "";

  constructor(private http: HttpClient, private toastr: ToastrService){
  }

  ngOnInit(): void {
      this.getTasks();
  }


  public addTask(): void {
    const data = {
      activity: this.activity,
      date: this.date,
      estimated: this.time
    };
    this.http.post("http://localhost:8080/task", data).subscribe(
      resp => {
        this.toastr.success('', JSON.stringify(resp));
        this.getTasks();
      },
      err => { console.log(err) }
    );
  }

  public getTasks(): void {
    this.http.get("http://localhost:8080/task").subscribe(
      success => {
        this.tasks = success;
      },
      err => { console.log(err) }
    );
  }

  public filteredSearch(filter: string): void {
    this.http.get("http://localhost:8080/task/"+filter).subscribe(
      success => {
        this.tasks = success;
      },
      err => { console.log(err) }
    );
  }

  public deleteTask(id: number): void {
    
    if (confirm("DESEAS ELIMINAR ESTE REGISTRO?")) {
      this.http.delete("http://localhost:8080/task/"+id).subscribe(
      success => {
        alert(success);
        this.getTasks();
      },
      err => { console.log(err) }
    );
    }
  }

}
