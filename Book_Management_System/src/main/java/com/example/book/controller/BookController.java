package com.example.book.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.example.book.model.*;
import com.example.book.service.BookService;


@RestController
@RequestMapping("/api/book")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
	@Autowired
	private BookService bookservice;
	
	@PostMapping("/add")
	public String add(@RequestBody Book book) {
		bookservice.saveBook(book);
		return"New Book Added sucessfully";
	}
	
	@GetMapping("/getAll")
	public List<Book> getAllBook(){
		return bookservice.getAllBook();
	}
	
	@DeleteMapping("/delete/{id}")
	public String delete(@PathVariable int id) {
		bookservice.deleteBook(id);
		return"Book with id" + id + "Has been deleted";
	}
	
	@PutMapping("/update")
	public String update(@RequestBody Book book) {
		bookservice.saveBook(book);
		return"Book Updated Sucessfully";
	}
	

}
