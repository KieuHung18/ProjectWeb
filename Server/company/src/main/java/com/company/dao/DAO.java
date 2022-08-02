package com.company.dao;
import java.util.List;

public interface DAO<E> {
  public void create(E element);
  public void disable();
  public void enable();
  public void edit(int id,E element);
  public E get(int id);
  public List<E> list();
  
}
