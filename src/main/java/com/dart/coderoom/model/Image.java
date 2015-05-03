package com.dart.coderoom.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import java.lang.Override;
import javax.persistence.Enumerated;
import com.dart.coderoom.model.UserType;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Image implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @Column
   private String url;

   @Column
   private String alt;

   @Enumerated
   private UserType userType;

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
      if (!(obj instanceof Image))
      {
         return false;
      }
      Image other = (Image) obj;
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

   public String getUrl()
   {
      return url;
   }

   public void setUrl(String url)
   {
      this.url = url;
   }

   public String getAlt()
   {
      return alt;
   }

   public void setAlt(String alt)
   {
      this.alt = alt;
   }

   public UserType getUserType()
   {
      return userType;
   }

   public void setUserType(UserType userType)
   {
      this.userType = userType;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      if (url != null && !url.trim().isEmpty())
         result += "url: " + url;
      if (alt != null && !alt.trim().isEmpty())
         result += ", alt: " + alt;
      return result;
   }
}