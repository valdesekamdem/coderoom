package com.dart.coderoom.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import java.lang.Override;
import java.util.Date;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import com.dart.coderoom.model.Course;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Session implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @Column
   @Temporal(TemporalType.DATE)
   private Date StartedOn;

   @Column
   @Temporal(TemporalType.DATE)
   private Date endOn;

   @ManyToOne
   private Course course;

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
   public boolean equals(Object obj)
   {
      if (this == obj)
      {
         return true;
      }
      if (!(obj instanceof Session))
      {
         return false;
      }
      Session other = (Session) obj;
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

   public Date getStartedOn()
   {
      return StartedOn;
   }

   public void setStartedOn(Date StartedOn)
   {
      this.StartedOn = StartedOn;
   }

   public Date getEndOn()
   {
      return endOn;
   }

   public void setEndOn(Date endOn)
   {
      this.endOn = endOn;
   }

   public Course getCourse()
   {
      return this.course;
   }

   public void setCourse(final Course course)
   {
      this.course = course;
   }
}