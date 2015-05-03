package com.dart.coderoom.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import java.lang.Override;
import com.dart.coderoom.model.FollowSession;
import java.util.Set;
import java.util.HashSet;
import javax.persistence.ManyToMany;
import java.util.Date;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Task implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @Column
   private int number;

   @Column
   private String content;

   @ManyToMany
   private Set<FollowSession> followSession = new HashSet<FollowSession>();

   @Column
   @Temporal(TemporalType.TIMESTAMP)
   private Date submitedOn;

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
      if (!(obj instanceof Task))
      {
         return false;
      }
      Task other = (Task) obj;
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

   public int getNumber()
   {
      return number;
   }

   public void setNumber(int number)
   {
      this.number = number;
   }

   public String getContent()
   {
      return content;
   }

   public void setContent(String content)
   {
      this.content = content;
   }

   public Set<FollowSession> getFollowSession()
   {
      return this.followSession;
   }

   public void setFollowSession(final Set<FollowSession> followSession)
   {
      this.followSession = followSession;
   }

   public Date getSubmitedOn()
   {
      return submitedOn;
   }

   public void setSubmitedOn(Date submitedOn)
   {
      this.submitedOn = submitedOn;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      result += "number: " + number;
      if (content != null && !content.trim().isEmpty())
         result += ", content: " + content;
      return result;
   }
}