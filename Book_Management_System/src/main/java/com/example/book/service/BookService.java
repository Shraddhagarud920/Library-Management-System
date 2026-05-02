package com.example.book.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.book.model.*;
import com.example.book.repository.BookRepository;

@Service
public class BookService {
	@Autowired
	private BookRepository bookRepository;
	
	public Book saveBook(Book book) {
		return bookRepository.save(book);
	}
	
	public List<Book> getAllBook(){
		return bookRepository.findAll();
	}
	
	public void deleteBook(int id) {
		bookRepository.deleteById(id);
	}
	
	public Book getBookById(int id) {
		return bookRepository.findById(id).orElse(null);
	}
	
}
