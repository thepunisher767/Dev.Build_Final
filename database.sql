USE [master]
GO
/****** Object:  Database [SantasLittleHelper]    Script Date: 10/27/2020 1:06:04 PM ******/
CREATE DATABASE [SantasLittleHelper]
 CONTAINMENT = NONE
 
ALTER DATABASE [SantasLittleHelper] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SantasLittleHelper].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SantasLittleHelper] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET ARITHABORT OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SantasLittleHelper] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SantasLittleHelper] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SantasLittleHelper] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SantasLittleHelper] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SantasLittleHelper] SET  MULTI_USER 
GO
ALTER DATABASE [SantasLittleHelper] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SantasLittleHelper] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SantasLittleHelper] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SantasLittleHelper] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SantasLittleHelper] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SantasLittleHelper] SET QUERY_STORE = OFF
GO
USE [SantasLittleHelper]
GO
/****** Object:  User [da]    Script Date: 10/27/2020 1:06:05 PM ******/
CREATE USER [da] FOR LOGIN [da] WITH DEFAULT_SCHEMA=[dbo]
CREATE USER [admin] FOR LOGIN [admin] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[decoration]    Script Date: 10/27/2020 1:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[decoration](
	[description] [nvarchar](100) NOT NULL,
	[done] [bit] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[gift]    Script Date: 10/27/2020 1:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[gift](
	[userid] [int] NOT NULL,
	[description] [nvarchar](100) NOT NULL,
	[done] [bit] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[party]    Script Date: 10/27/2020 1:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[party](
	[description] [nvarchar](200) NOT NULL,
	[done] [bit] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[people]    Script Date: 10/27/2020 1:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[people](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[firstname] [nvarchar](50) NOT NULL,
	[lastname] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_People] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[party] ([description], [done]) VALUES (N'Purchase Roast for Dinner', 1)
GO
INSERT [dbo].[party] ([description], [done]) VALUES (N'Cook Roast for Dinner', 1)
GO
INSERT [dbo].[party] ([description], [done]) VALUES (N'Get Crayons for the Kids', 0)
GO
INSERT [dbo].[party] ([description], [done]) VALUES (N'Get some new coloring books for the kids', 1)
GO
/****** Object:  StoredProcedure [dbo].[deleteFromParty]    Script Date: 10/27/2020 1:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[deleteFromParty]

@description nvarchar(200)

AS

DELETE FROM party WHERE description = @description;
GO
/****** Object:  StoredProcedure [dbo].[toggle]    Script Date: 10/27/2020 1:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[toggle]
@description nvarchar(200)
AS

UPDATE party
SET done = ~done
WHERE description = @description;
GO
USE [master]
GO
ALTER DATABASE [SantasLittleHelper] SET  READ_WRITE 
GO
