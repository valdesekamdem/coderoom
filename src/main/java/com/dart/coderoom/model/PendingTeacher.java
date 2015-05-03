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
import com.dart.coderoom.model.Image;
import javax.persistence.OneToOne;
import javax.persistence.Enumerated;
import com.dart.coderoom.model.Language;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class PendingTeacher implements Serializable
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
   private String nickname;

   @Column
   private String password;

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
   @Temporal(TemporalType.DATE)
   private Date createdOn;

   @Column
   private boolean able;

   @Column
   private String location;

   @OneToOne
   private Image image;

   @Enumerated
   private Language language;

   @Column
   private String phone;

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
      if (!(obj instanceof PendingTeacher))
      {
         return false;
      }
      PendingTeacher other = (PendingTeacher) obj;
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

   public String getNickname()
   {
      return nickname;
   }

   public void setNickname(String nickname)
   {
      this.nickname = nickname;
   }

   public String getPassword()
   {
      return password;
   }

   public void setPassword(String password)
   {
      this.password = password;
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

   public Date getCreatedOn()
   {
      return createdOn;
   }

   public void setCreatedOn(Date createdOn)
   {
      this.createdOn = createdOn;
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

   public Image getImage()
   {
      return image;
   }

   public void setImage(Image image)
   {
      this.image = image;
   }

   public Language getLanguage()
   {
      return language;
   }

   public void setLanguage(Language language)
   {
      this.language = language;
   }

   public String getPhone()
   {
      return phone;
   }

   public void setPhone(String phone)
   {
      this.phone = phone;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      if (name != null && !name.trim().isEmpty())
         result += "name: " + name;
      if (nickname != null && !nickname.trim().isEmpty())
         result += ", nickname: " + nickname;
      if (password != null && !password.trim().isEmpty())
         result += ", password: " + password;
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
      return result;
   }
}