package com.company.datasource;
import java.util.List;
import javax.sql.DataSource;
public interface DAO<E> {

  public void setDataSource(DataSource dataSource);
  public void create(E element);
  public void disable();
  public void enable();
  public void edit(String key,E element);
  public E get(String key);
  public List<E> list();
  
}
