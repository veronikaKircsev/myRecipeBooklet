function AlbumEntry({ album }) {
    const [assets, setAssets] = useState([]);
  
    useEffect(() => {
      async function getAlbumAssets() {
        const albumAssets = await MediaLibrary.getAssetsAsync({ album });
        setAssets(albumAssets.assets);
      }
      getAlbumAssets();
    }, [album]);
  
    return (
      <View key={album.id} style={styles.albumContainer}>
        <Text>
          {album.title} - {album.assetCount ?? 'no'} assets
        </Text>
        <View style={styles.albumAssetsContainer}>
          {assets && assets.map((asset) => (
            <Image source={{ uri: asset.uri }} width={50} height={50} />
          ))}
        </View>
      </View>
    );
  }