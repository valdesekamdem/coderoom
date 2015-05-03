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
import javax.persistence.Enumerated;
import com.dart.coderoom.model.Language;
import com.dart.coderoom.model.Image;
import javax.persistence.OneToOne;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Teacher implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @Column
   private String name;

   @Column
   private String email;

   @Column
   @Temporal(TemporalType.DATE)
   private Date birthDate;

   @Column
   private String sexe;

   @Column(length = 3000)
   private String description;

   @Column
   private boolean able;

   @Column
   private String location;

   @Column
   @Temporal(TemporalType.DATE)
   private Date createdOn;

   @Enumerated
   private Language language;

   @OneToOne
   private Image image;

   @Column
   private String phone;

   @Column
   private boolean deleted;

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
      if (!(obj instanceof Teacher))
      {
         return false;
      }
      Teacher other = (Teacher) obj;
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

   public String getName()
   {
      return name;
   }

   public void setName(String name)
   {
      this.name = name;
   }

   public String getEmail()
   {
      return email;
   }

   public void setEmail(String email)
   {
      this.email = email;
   }

   public Date getBirthDate()
   {
      return birthDate;
   }

   public void setBirthDate(Date birthDate)
   {
      this.birthDate = birthDate;
   }

   public String getSexe()
   {
      return sexe;
   }

   public void setSexe(String sexe)
   {
      this.sexe = sexe;
   }

   public String getDescription()
   {
      return description;
   }

   public void setDescription(String description)
   {
      this.description = description;
   }

   public boolean isAble()
   {
      return able;
   }

   public void setAble(boolean able)
   {
      this.able = able;
   }

   public String getLocation()
   {
      return location;
   }

   public void setLocation(String location)
   {
      this.location = location;
   }

   public Date getCreatedOn()
   {
      return createdOn;
   }

   public void setCreatedOn(Date createdOn)
   {
      this.createdOn = createdOn;
   }

   public Language getLanguage()
   {
      return language;
   }

   public void setLanguage(Language language)
   {
      this.language = language;
   }

   public Image getImage()
   {
      return image;
   }

   public void setImage(Image image)
   {
      this.image = image;
   }

   public String getPhone()
   {
      return phone;
   }

   public void setPhone(String phone)
   {
      this.phone = phone;
   }

   public boolean isDeleted()
   {
      return deleted;
   }

   public void setDeleted(boolean deleted)
   {
      this.deleted = deleted;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      if (name != null && !name.trim().isEmpty())
         result += "name: " + name;
      if (email != null && !email.trim().isEmpty())
         result += ", email: " + email;
      if (sexe != null && !sexe.trim().isEmpty())
         result += ", sexe: " + sexe;
      if (description != null && !description.trim().isEmpty())
         result += ", description: " + description;
      result += ", able: " + able;
      if (location != null && !location.trim().isEmpty())
         result += ", location: " + location;
      if (phone != null && !phone.trim().isEmpty())
         result += ", phone: " + phone;
      result += ", deleted: " + deleted;
      return result;
   }
}