package com.dart.coderoom.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import java.lang.Override;
import com.dart.coderoom.model.Session;
import java.util.Set;
import java.util.HashSet;
import javax.persistence.ManyToMany;
import com.dart.coderoom.model.Student;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class FollowSession implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @ManyToMany
   private Set<Session> session = new HashSet<Session>();

   @ManyToMany
   private Set<Student> student = new HashSet<Student>();

   public Long getId()
   {
      return this.id;
   }

   public void setId(final Long id)
   {
      this.id = id;
   }

   public int getVersion()
   {
      return this.version;
   }

   public void setVersion(final int version)
   {
      this.version = version;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      if (id != null)
         result += "id: " + id;
      return result;
   }

   @Override
   public boolean equals(Object obj)
   {
      if (this == obj)
      {
         return true;
      }
      if (!(obj instanceof FollowSession))
      {
         return false;
      }
      FollowSession other = (FollowSession) obj;
      if (id != null)
      {
         if (!id.equals(other.id))
         {
            return false;
         }
      }
      return true;
   }

   @Override
   public int hashCode()
   {
      final int prime = 31;
      int result = 1;
      result = prime * result + ((id == null) ? 0 : id.hashCode());
      return result;
   }

   public Set<Session> getSession()
   {
      return this.session;
   }

   public void setSession(final Set<Session> session)
   {
      this.session = session;
   }

   public Set<Student> getStudent()
   {
      return this.student;
   }

   public void setStudent(final Set<Student> student)
   {
      this.student = student;
   }
}